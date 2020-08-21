import { useLayoutEffect, useState } from 'react';

export default function useWindowOrientation() {
  const [orientation, setOrientation] = useState(undefined);
  useLayoutEffect(() => {
    function updateSize(a) {
      const o = a && a.target ? a.target.orientation : window.orientation;
      setOrientation(o);
    }

    window.addEventListener('orientationchange', updateSize);
    updateSize();
    return () => window.removeEventListener('orientationchange', updateSize);
  }, []);
  return orientation;
}
