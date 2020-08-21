import { dev } from '../../config';

export function importAll(r) {
  return r
    .keys()
    .map(r)
    .filter((a) => {
      const devContext = () => !!(a && a.indexOf('dev-') >= 0);
      return dev ? devContext() : !devContext();
    });
}

export const allImages = importAll(
  require.context('../../assets/images/pages', false, /\.(png|jpe?g|svg)$/),
);
