import React from 'react';
import PropTypes from 'prop-types';
import './SubCategoryList.scss';

export default function SubCategoryList({ category }) {
  const { children } = category;

  return (
    <div className="page-width">
      <div className="mb-1 md:mb-2 category__general">
        <div className="category__children-scroll">
          {children && (
            <div className="category__children">
              {children.map((child) => (
                <a key={child.categoryId} href={child.url} className="category__child">
                  <div className="category__child-content">
                    {child.image ? (
                      <img
                        src={child.image.url}
                        alt={child.name}
                        className="category__child-image"
                      />
                    ) : (
                      <div className="category__child-placeholder" />
                    )}
                    <span className="category__child-name">{child.name}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


SubCategoryList.propTypes = {
  category: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        categoryId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        image: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }),
      })
    ),
  }).isRequired,
};

export const layout = {
  areaId: 'content',
  sortOrder: 6
};

export const query = ` query Query {
  category(id: getContextValue('categoryId')) {
    children {
      categoryId
      name
      url
      image {
        url
      }
    }
  }
}`;
