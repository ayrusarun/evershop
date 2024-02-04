import React from 'react';
import PropTypes from 'prop-types';

function ProductNoThumbnail({ width, height }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      
    >
    <path
      d="m 5.5001761,-0.03125 -1.5000755,2 6.0003024,0 -1.500076,-2 -3.0001509,0 z m -1.5000755,3 3.000151,2.75 3.0001514,-2.75 -6.0003024,0 z m -0.1250063,2.125 C 2.7594552,6.0221898 2,7.4228958 2,8.96875 2,11.716935 4.3397727,14 6.969,14 9.598227,14 11.938,11.716935 11.938,8.96875 11.938,7.4345438 11.195755,6.0534671 10.094157,5.125 L 8.9691006,6.15625 c 0.9205844,0.6728387 1.5625784,1.7640005 1.5625784,2.8125 0,1.711475 -1.7320219,3.46875 -3.562679,3.46875 -1.8306571,0 -3.5314277,-1.757275 -3.5314277,-3.46875 0,-1.0559982 0.6627104,-2.1406148 1.5938302,-2.8125 L 3.8750943,5.09375 z"
      style={{
        fill: "#595056"
      }}
    />
  </svg>
);
}

ProductNoThumbnail.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

ProductNoThumbnail.defaultProps = {
  width: 100,
  height: 100
};

export default ProductNoThumbnail;
