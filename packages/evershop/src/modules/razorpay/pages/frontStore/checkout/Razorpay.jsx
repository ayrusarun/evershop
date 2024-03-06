import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useCheckout } from '@components/common/context/checkout';
import RazorpayLogo from '@components/frontStore/razorpay/RazorpayLogo';


export function RazorpayPayment({ setting }) {
  const [razorpayOrderId, setRazorpayOrderId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");


  const checkout = useCheckout();
  const {  checkoutSuccessUrl, orderPlaced, orderId } = checkout;
  
  useEffect(() => {
    const fetchRazorpayOrderId = async () => {
      try {
        const response = await fetch('/api/razorpay/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_id: orderId
          })
        });
        const data = await response.json();
        if (!data.error) {
          setRazorpayOrderId(data.data.orderId); 
          setAmount(data.data.amount)
          setCustomerName(data.data.customer_name)
          setCustomerEmail(data.data.customer_email)
          setNotes(data.data.notes)
        } else {
          // handle error
        }
      } catch (error) {
        // handle error
      }
    };

    if(orderId){
      fetchRazorpayOrderId();
    }
    
  }, [orderId]);


  const options = {
    key: setting.razorpayPublishableKey,
    amount, 
    name: 'Krystal Touch',
    description: 'Jwellery that radiates healing energy',
    order_id: razorpayOrderId,
    image: "http://localhost:3000/KT.png",
    handler(response) {
      // Handle the response from Razorpay here
      if(response.razorpay_payment_id) {
          // Payment successful
          window.location.href = `${checkoutSuccessUrl}/${orderId}`;
       } else {
          // Payment failed or was canceled
          // You can redirect the user to an error page or perform other actions
          // window.location.href = `${checkoutErrorUrl}/${orderId}`;
      }       
    },
    prefill: {
        name: customerName,
        contact: '9999999999',
        email: customerEmail
    },
    notes: {
        address: notes
    },
    theme: {
        color: '#7d0049',
        hide_topbar: false
    }
  };

  const openPayModal = () => {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
  };

  React.useEffect(() => {
    if (orderPlaced && razorpayOrderId) {
      openPayModal();
    }
  }, [razorpayOrderId]);

  
  useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
  }, []);

  return (
      <div />
  );

  
};

RazorpayPayment.propTypes = {
  setting: PropTypes.shape({
    razorpayPublishableKey: PropTypes.string.isRequired
  }).isRequired
};


export default function RazorpayMethod({ setting }) {
  const checkout = useCheckout();
  const { paymentMethods, setPaymentMethods } = checkout;
  // Get the selected payment method
  const selectedPaymentMethod = paymentMethods
    ? paymentMethods.find((paymentMethod) => paymentMethod.selected)
    : undefined;
  return (
    <div>
      <div className="flex justify-start items-center gap-1">
        {(!selectedPaymentMethod ||
          selectedPaymentMethod.code !== 'razorpay') && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPaymentMethods((previous) =>
                previous.map((paymentMethod) => {
                  if (paymentMethod.code === 'razorpay') {
                    return {
                      ...paymentMethod,
                      selected: true
                    };
                  } else {
                    return {
                      ...paymentMethod,
                      selected: false
                    };
                  }
                })
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-circle"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
          </a>
        )}
        {selectedPaymentMethod && selectedPaymentMethod.code === 'razorpay' && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2c6ecb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-check-circle"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        )}
        <div>
          <RazorpayLogo width={100} />
        </div>
      </div>
      <div>
        {selectedPaymentMethod && selectedPaymentMethod.code === 'razorpay' && (
          <div>
            <RazorpayPayment setting={setting}/>
          </div>
        )}
      </div>
    </div>
  );
}

RazorpayMethod.propTypes = {
  setting: PropTypes.shape({
    razorpayPublishableKey: PropTypes.string.isRequired
  }).isRequired
};

export const layout = {
  areaId: 'checkoutPaymentMethodrazorpay',
  sortOrder: 1
};


export const query = `
  query Query {
    setting {
      razorpayPublishableKey
    }
  }
`;
