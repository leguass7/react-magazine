/* eslint-disable no-return-assign */
export function calculateSizeContent(w, h) {
  let nH = h;
  let nW = 2 * h;
  if (nW > w) {
    nW = w;
    nH = w / 2;
  }
  return {
    width: nW,
    height: nH,
  };
}

export function calculateDimension(w, h) {
  const b = Math.ceil((w * 10) / 100);
  const result = {
    ...calculateSizeContent(w - b / 2, h),
    buttonWidth: b,
  };
  return result;
}

export const debounceEvent = (fn, wait = 1000, time) => (...args) =>
  clearTimeout(time, (time = setTimeout(() => fn(...args), wait)));
