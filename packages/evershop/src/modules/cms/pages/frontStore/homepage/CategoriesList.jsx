import React from 'react';
import './CategoriesList.scss'; // You can add styles for the categories list in this file

function CategoriesList() {
  // Replace this with your actual list of categories
  const categories = [
    { name: 'Hot Deals', imageSrc: '/categories/offerzone-min.gif' , targetId: 'hot-deals' },
    { name: 'Premium Collections', imageSrc: '/categories/premium-min.gif', targetId: 'premium-collections' },
    { name: 'Best Seller', imageSrc: '/categories/mostloved-min.gif', targetId: 'best-seller' },
    { name: 'Buy1 Get1', imageSrc: '/categories/buy1free-min.gif', targetId: 'buy1-get1' }
  ];

  const headerHeight = 120; // Example height, replace with the actual height of your header

  const handleClick = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - headerHeight, // Adjusting the scroll position to accommodate the fixed header
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="categories-list">
      <ul className="scrollable-list">
        {categories.map((category, index) => (
          <li key={index} onClick={() => handleClick(category.targetId)}>
            <div className="category-item ml-3">
              <img src={category.imageSrc} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default CategoriesList;
