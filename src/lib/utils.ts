export const IS_DEV = process.env.NODE_ENV === 'development';

export const ENV = (key: string, defaultValue?: string): string => {
  if (process.env[key] === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Missing env var ${key}`);
    }
    return defaultValue;
  }
  return process.env[key];
};
