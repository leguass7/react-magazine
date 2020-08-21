/* eslint-disable react/destructuring-assignment */
import React, { useRef, useEffect, memo, useContext } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import TurnContext from './TurnContext';

function Turn(props) {
  let fadeClass = useRef('');
  const { options, style, className, children } = props;
  const { registerTurn, getRefMag } = useContext(TurnContext);

  useEffect(() => {
    if (fadeClass && $(fadeClass).turn) {
      $(fadeClass).turn({ ...options });
      registerTurn($(fadeClass));
    }

    return () => {
      // document.removeEventListener('keydown', handleKeyDown);
    };
    // 	//
  }, [registerTurn, options, getRefMag]);

  return (
    <div
      className={className}
      style={{ ...style }}
      ref={(el) => {
        fadeClass = el;
      }}
    >
      {children}
    </div>
  );
}

Turn.propTypes = {
  options: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
};
Turn.defaultProps = {
  options: {},
  style: {},
  className: null,
  children: null,
};

export default memo(Turn);
