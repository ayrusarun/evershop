import PropTypes from 'prop-types';
import React from 'react';
import './MobileMenu.scss';

export default function MobileMenu({ menu: { items } }) {
  const [activeMenu, setActiveMenu] = React.useState(null);

  const toggleSubMenu = (index) => {
    setActiveMenu(activeMenu === index ? 0 : index);
  };  

  const renderSubMenu = (items, level = 0) => {
    return (
      <ul className={`sub-menu level-${level}`}>
        {items.map((item, index) => (
          <li className="snav-item" key={index}>
            <a
              className="nav-link"
              href={item.url}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="main-menu-mobile self-center">
      <a
        className="menu-icon"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveMenu(activeMenu === null ? 0 : null);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          style={{ stroke: 'var(--MobileMenu)' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </a>
      {activeMenu !== null && (
        <ul className="nav justify-content-center">
          {items.map((item, index) => (
            <li className="nav-item" key={index}>
              
              <div className="d-flex justify-content-between align-items-center">
                <a
                  className="nav-link"
                  href={item.url}
                >
                  {item.name}
                </a>
                {item.children && item.children.length >= 1 && (
                  <span className={`arrow-icon ${activeMenu === index ? 'rotate-down' : 'rotate-up'}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSubMenu(index);
                    }}
                  >
                    {activeMenu === index ? '+' : '+'}
                  </span>
                )}
              </div>
              
              
              {activeMenu === index && item.children && (
                <ul className="sub-menu">
                  {renderSubMenu(item.children, 1)}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}






export const layout = {
  areaId: 'header',
  sortOrder: 1
};

export const query = `
  query {
    menu {
      items {
        name
        url
        children {
          name
          url
          children {
            name
            url
          }
        }
      }
    }
  }
`;