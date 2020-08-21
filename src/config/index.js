import { name, version } from '../../package.json';

export const dev = !!(process.env.NODE_ENV === 'development');

export const appName = process.env.REACT_APP_NAME || name;
export const homepageBase = dev ? '' : '';
export const publicUrl = dev
  ? 'http://localhost:3000'
  : process.env.PUBLIC_URL || process.env.REACT_APP_PUBLIC_URL || 'localhost';

const config = {
  appName,
  homepageBase,
  publicUrl,
  appVersion: version,
};

export default config;
