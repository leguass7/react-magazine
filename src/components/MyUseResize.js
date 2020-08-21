/* eslint-disable react/prop-types */
import React, { useCallback, useState, useEffect } from 'react';
import ReactResizeDetector from 'react-resize-detector';

export default function MyResize({ onResize }) {
  const [orientation, setOrientation] = useState(window.orientation || 0);
  const [dimention, setDimention] = useState({ width: 0, height: 0 });

  const updateDimension = useCallback(
    (w, h) => {
      setDimention({ width: w, height: h });
      onResize(w, h, orientation);
    },
    [onResize, orientation],
  );

  useEffect(() => {
    const updateOrientation = (a) => {
      const o = a && a.target ? a.target.orientation : window.orientation;
      setOrientation(o);
      onResize(dimention.width, dimention.height, o);
    };

    window.addEventListener('orientationchange', updateOrientation);
    return () => window.removeEventListener('orientationchange', updateOrientation);
  }, [dimention, onResize]);

  return (
    <ReactResizeDetector
      refreshMode="debounce"
      refreshRate={300}
      handleWidth
      handleHeight
      onResize={updateDimension}
    />
  );
}
