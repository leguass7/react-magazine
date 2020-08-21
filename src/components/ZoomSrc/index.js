import React from 'react';
import PropTypes from 'prop-types';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import './zoom-src.css';
import { DivClose, ButtonClose, DivContainer } from './styles';

export default function ZoomSrc({
  src,
  onCloseZoom,
  screenWidth,
  screenHeight,
  // screenOrientation,
}) {
  return (
    <div className="div-zoom-src">
      <DivClose className="div-zoom-close" size={44}>
        <ButtonClose type="button" onClick={onCloseZoom} value={src} />
      </DivClose>
      <DivContainer className="div-zoom-container" width={screenWidth} height={screenHeight}>
        <TransformWrapper key={`page-zoom-${src}`}>
          <TransformComponent>
            <img src={src} alt="" width={screenHeight} height={screenHeight} />
          </TransformComponent>
        </TransformWrapper>
      </DivContainer>
    </div>
  );
}

ZoomSrc.defaultProps = {
  onCloseZoom: () => {},
  src: '',
  screenHeight: 'auto',
  screenWidth: 'auto',
};

ZoomSrc.propTypes = {
  onCloseZoom: PropTypes.func,
  src: PropTypes.string,
  screenHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  screenWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
