import React from 'react';
import './Menu.scss'; // Import the compiled CSS

const Menu = ({ menu }) => {
  const renderMenuItem = (item) => {
    return (
      <li key={item.name}>
        <a href={item.url}>{item.name}</a>
        {item.children && item.children.length > 0 && (
          <ul>
            {item.children.map((child) => renderMenuItem(child))}
          </ul>
        )}
      </li>
    );
  };

  return (

    <div className="main-menu self-center hidden md:block">
      <nav className="menu">
        <ul>
          {menu && menu.items.map((item) => renderMenuItem(item))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;


export const layout = {
  areaId: 'header',
  sortOrder: 5
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