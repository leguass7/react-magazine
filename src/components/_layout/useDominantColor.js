import { useEffect, useCallback, useState } from 'react';
import { usePalette } from 'react-palette';
import chroma from 'chroma-js';

function calculateColors(colorsObject = {}) {
  const colors = Object.keys(colorsObject);
  if (colors.length <= 0) return `transparent`;
  return chroma.average(colors.map((c) => colorsObject[c]));
}

export default function useDominantColor(bgImage) {
  const [color, setColor] = useState('transparent');
  const { data } = usePalette(bgImage);

  const updateColors = useCallback(() => {
    if (bgImage && data.vibrant) {
      setColor(calculateColors(data));
    }
  }, [bgImage, data]);

  useEffect(() => {
    updateColors();
  }, [updateColors]);
  return color;
}
