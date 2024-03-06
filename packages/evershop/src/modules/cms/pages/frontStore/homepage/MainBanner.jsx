import React, { useState, useEffect } from 'react';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import './MainBanner.scss';
import CategoriesList from './CategoriesList'; 

export default function MainBanner() {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const text = _('Discount ${discount} For All Orders Over ${price}', {
    discount: '20%',
    price: '₹2000'
  });

  return (
    <div>
      <CategoriesList /> 

      <div className="main-banner-home flex items-center">
        <video autoPlay muted loop className="absolute top-0 left-0 object-cover w-full h-full z-0">
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay absolute top-0 left-0 bottom-0 right-0 block bg-gray-700 opacity-35 z-1" />

        <div className="container grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="banner-bg" style={{ transform: `translateY(-${scrollPos * 0.5}px)` }}>
            {/* Background image or video */}
          </div>
          <div className="text-center md:text-left px-2 banner-content" style={{ transform: `translateY(${scrollPos * 0.3}px)` }}>
            <h2 className="h1">{text}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
