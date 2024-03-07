import ProductList from '@components/frontStore/catalog/product/list/List';
import React from 'react';
import PropTypes from 'prop-types';


export default function Collections({ collections }) {
  if (!collections || collections.length === 0) {
    return null;
  }
  return (
    <div className="pt-3">
      <div className="page-width">
        { collections.items.map(collection => (
          <div key={collection.uuid}>
            <h3 className="mt-3 mb-3 text-center uppercase h5 tracking-widest">
              {collection.name}
            </h3>
            <ProductList products={collection.products.items} countPerRow={4} />
          </div>
        ))}
      </div>
    </div>
  );
}

Collections.propTypes = {
  collections: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        products: PropTypes.shape({
          items: PropTypes.arrayOf(
            PropTypes.shape({
              productId: PropTypes.number.isRequired,
              sku: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              price: PropTypes.shape({
                regular: PropTypes.shape({
                  value: PropTypes.number.isRequired,
                  text: PropTypes.string.isRequired,
                }).isRequired,
                special: PropTypes.shape({
                  value: PropTypes.number.isRequired,
                  text: PropTypes.string.isRequired,
                }).isRequired,
              }).isRequired,
              image: PropTypes.shape({
                alt: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
              }).isRequired,
              url: PropTypes.string.isRequired,
            }).isRequired
          ).isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};


export const layout = {
  areaId: 'content',
  sortOrder: 15
};

export const query = `
  query {
    collections {
      items {
        uuid
        name
        products(filters: [{key: "limit", operation: "=", value: "20"}]) {
          items {
            productId
            name
            sku
            price {
              regular {
                value
                text
              }
              special {
                value
                text
              }
            }
            image {
              alt
              url: listing
            }
            url
          }
        }
      }
    }
  }
`;
