import { useLayoutEffect, useState } from 'react';

export default function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const [orient, setOrient] = useState(window.orientation || 0);

  useLayoutEffect(() => {
    function updateSize(e = {}) {
      const { type } = e;
      if (type === 'orientationchange') {
        setOrient(window.orientation || 0);
      } else if (type === 'resize') {
        setSize([window.innerWidth, window.innerHeight]);
      }
    }

    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', updateSize);

    updateSize({});

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
    };
  }, []);

  return [size[0], size[1], orient];
}
