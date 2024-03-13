/* eslint-disable global-require */
const {
  insert,
  startTransaction,
  update,
  commit,
  rollback,
  select
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getSetting } = require('../../../setting/services/setting');
const { emit } = require('@evershop/evershop/src/lib/event/emitter');
const { debug } = require('@evershop/evershop/src/lib/log/debuger');
const crypto = require('crypto');

function verifySignature(message, receivedSignature, key) {
    const expectedSignature = crypto.createHmac('sha256', key)
                                   .update(message)
                                   .digest('hex');

    return expectedSignature === receivedSignature;
}

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const signature = request.headers['x-razorpay-signature'];
  const bodyString = request.body.toString('utf-8');
  const bodyJson = JSON.parse(bodyString);

  let connection;
  try {
    connection = await getConnection();
    await startTransaction(connection);

    // Razorpay Configuration
    const razorpayConfig = getConfig('system.razorpay', {});

    let razorpayEndpointSecret;

    if ( razorpayConfig.razorpayEndpointSecret) {
      razorpayEndpointSecret = razorpayConfig.razorpayEndpointSecret;
    }else {
      razorpayEndpointSecret = await getSetting('razorpayEndpointSecret', '');
    } 
    
    const isValidSignature = verifySignature(request.body, signature, razorpayEndpointSecret );
    if (!isValidSignature) {
      return response.status(400).send('Invalid signature');
    }

    const event = bodyJson;
    switch (event.event) {
      case 'payment.captured': {
        const payment = event.payload.payment.entity;
        const orderId = payment.notes.orderId;
        
        // Load the order
        const order = await select()
          .from('order')
          .where('uuid', '=', orderId)
          .load(connection);
    
        // Update the order
        // Create payment transaction
        await insert('payment_transaction')
          .given({
            amount: payment.amount / 100, // converting from paisa to rupees
            payment_transaction_order_id: order.order_id,
            transaction_id: payment.id,
            transaction_type: payment.method, // assuming payment method as transaction type
            payment_action: 'Capture' // Razorpay captures payments automatically
          })
          .execute(connection);
    
        // Update the order status
        await update('order')
          .given({ payment_status: 'paid' })
          .where('order_id', '=', order.order_id)
          .execute(connection);
    
        // Add an activity log
        await insert('order_activity')
          .given({
            order_activity_order_id: order.order_id,
            comment: `Customer paid by using Razorpay. Transaction ID: ${payment.id}`
          })
          .execute(connection);
    
        // Emit event to indicate order placed
        await emit('order_placed', { ...order });
        break;
      }
      // Add cases to handle other Razorpay webhook events as needed
    
      default: {
        debug(`Unhandled event type ${event.event}`);
      }
    }
    
    await commit(connection);
    // Return a response to acknowledge receipt of the event
    response.json({ received: true });

  } catch (err) {
    if (connection) {
      await rollback(connection);
    }
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  return null;
};
