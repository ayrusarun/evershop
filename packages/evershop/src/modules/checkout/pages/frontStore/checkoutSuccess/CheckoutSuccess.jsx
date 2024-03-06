import React, { useState, useEffect } from 'react';
import Area from '@components/common/Area';
import './CheckoutSuccess.scss';
import ReviewPopup from './ReviewPopup';

export default function CheckoutSuccessPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPopupOpen(true);
    }, 2500); // Delay time in milliseconds (e.g., 2000ms = 2 seconds)

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout);
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  return (
    <div className="page-width grid grid-cols-1 md:grid-cols-2 gap-3">
      <Area id="checkoutSuccessPageLeft" />
      <Area id="checkoutSuccessPageRight" />
      <div>
        {isPopupOpen && <ReviewPopup onClose={closePopup} />}
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
