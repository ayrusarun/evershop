const { select } = require('@evershop/postgres-query-builder');
const smallestUnit = require('zero-decimal-currencies');
const Razorpay = require('razorpay');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const {
  OK,
  INVALID_PAYLOAD
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { getSetting } = require('../../../setting/services/setting');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  // eslint-disable-next-line camelcase
  const { order_id } = request.body;
  // Check the order
  const order = await select()
    .from('order')
    .where('uuid', '=', order_id)
    .load(pool);

  if (!order) {
    response.status(INVALID_PAYLOAD);
    response.json({
      error: {
        status: INVALID_PAYLOAD,
        message: 'Invalid order'
      }
    });
  } else {
    const razorpayConfig = getConfig('system.razorpay', {});
    let razorpayKeyId;
    let razorpayKeySecret;

    if (razorpayConfig.keyId && razorpayConfig.keySecret) {
      razorpayKeyId = razorpayConfig.keyId;
      razorpayKeySecret = razorpayConfig.keySecret;
    } else {
      razorpayKeyId = await getSetting('razorpayPublishableKey', '');
      razorpayKeySecret = await getSetting('razorpaySecretKey', '');
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret
    });

    // Create an order with Razorpay
    const orderAmount = smallestUnit.default(order.grand_total, order.currency);

    const orderData = {
      amount: orderAmount,
      currency: order.currency,
      receipt: order_id, 
      payment_capture: 1,
      notes: {
        orderId: order.order_id
      }
    };

    razorpay.orders.create(orderData, (err, razorpayOrder) => {
      if (err) {
        response.status(500).json({
          error: {
            status: 500,
            message: 'Error creating Razorpay order'
          }
        });
      } else {
        response.status(OK);
        response.json({
          data: {
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            receipt: razorpayOrder.receipt,
            notes: razorpayOrder.notes,
            customer_name: order.customer_full_name,
            customer_email: order.customer_email,
            // customer_phone: order.customer_phone,
            razorpayOrder // You might not need to return the entire order object, adjust as necessary
          }
        });
      }
    });
  }
};
