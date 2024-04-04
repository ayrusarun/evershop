import React from 'react';
import './FeaturedCategories.scss';

export default function FeaturedCategories() {
  return (
    <div className="mt-15 ">
      <h3 className="h5 mt-1 text-center "> FEATURED CATEGORIES </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 page-width mt-1">
      <div>
          <div className="text-left" style={{ position: 'relative' }}>
            <a href="/krystals">
              <div className="image-container">
                <img src="./FeaturedCategories/krystal.png" alt="" />
                <div className="overlay">KRYSTALS</div>
              </div>
            </a>
          </div>
        </div>

        <div>
          <div className="text-left" style={{ position: 'relative' }}>
            <a href="/18k-gold/necklace">
              <div className="image-container">
                <img src="./FeaturedCategories/necklace.png" alt="" />
                <div className="overlay">NECKLACE</div>
              </div>
            </a>
          </div>
        </div>

        <div>
          <div className="text-left" style={{ position: 'relative' }}>
            <a href="/18k-gold/earrings">
              <div className="image-container">
                <img src="./FeaturedCategories/earrings.png" alt="" />
                <div className="overlay">EARRINGS</div>
              </div>
            </a>
          </div>
        </div>

        <div>
          <div className="text-left" style={{ position: 'relative' }}>
            <a href="/18k-gold/braclets">
              <div className="image-container">
                <img src="./FeaturedCategories/braclets.png" alt="" />
                <div className="overlay">BRACELETS</div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};