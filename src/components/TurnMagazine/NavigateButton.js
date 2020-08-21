/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import imagePrevious from './assets/left-n.svg';
import imageNext from './assets/right-n.svg';

export default function NavigateButton(props) {
  const { right, width, height, onClick, value, hide } = props;

  const stl = {
    height: height || '50%',
    backgroundImage: `url(${imagePrevious})`,
    visibility: hide ? 'hidden' : 'visible',
  };
  if (right) {
    stl.right = 0;
    stl.backgroundImage = `url(${imageNext})`;
  } else {
    stl.left = 0;
  }

  function handleClick(e) {
    onClick(e, value);
  }
  return (
    <div
      key={`btnkey-${value}`}
      className="app-magazine-btn"
      data-position={value}
      onClick={handleClick}
      style={{ width: width / 2, position: 'absolute', top: '50%', zIndex: 1000, ...stl }}
    >
      <div />
    </div>
  );
}

NavigateButton.defaultProps = {
  onClick: () => {},
  right: false,
  width: null,
  height: null,
  value: 1,
  hide: false,
};

NavigateButton.propTypes = {
  onClick: PropTypes.func,
  right: PropTypes.bool,
  hide: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.number,
};
