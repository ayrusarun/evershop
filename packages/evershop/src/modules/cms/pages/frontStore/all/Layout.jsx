import React from 'react';
import Area from '@components/common/Area';
import Loader from '@components/common/Loader';

import './Layout.scss';
import './tailwind.scss';

export default function Layout() {
  // Define your message variable
  const whatsappMessage = "Hello! I was browsing through Krystal Touch and I need some help!";

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  return (
    <>
      <Loader />
      <div className="header flex justify-between">
        <Area
          id="header"
          noOuter
          coreComponents={[
            {
              component: { default: Area },
              props: {
                id: 'icon-wrapper',
                className: 'icon-wrapper flex justify-between space-x-1'
              },
              sortOrder: 20
            }
          ]}
        />
      </div>
      <main className="content">
        <Area id="content" className="" noOuter />
      </main>
      <div className="footer">
        <Area id="footer" noOuter coreComponents={[]} />
      </div>

      {/* Font Awesome CSS */}
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />

      {/* WhatsApp icon with dynamic message */}
      <a
        href={`https://wa.me/918940882711?text=${encodedMessage}`}
        className="whatsapp_float" // Using className instead of class for JSX
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp whatsapp-icon" />
      </a>
       
    </>
  );
}

export const layout = {
  areaId: 'body',
  sortOrder: 1
};
