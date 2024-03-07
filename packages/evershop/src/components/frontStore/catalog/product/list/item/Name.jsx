import PropTypes from 'prop-types';
import React from 'react';

function Name({ name, url }) {
  return (
    <div className="product-name product-list-name mt-1 mb-025">
      <a href={url} className="font-roboto hover:underline text-202020 h7">
        <span>{name}</span>
      </a>
    </div>
  );
}

Name.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string
};

Name.defaultProps = {
  url: '',
  name: ''
};

export { Name };
