import { Metadata } from 'next';

import { Page } from '@/payload-types';

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

export function metadata(meta?: Page['meta']): Metadata {
  return {
    title: meta?.title || 'Anime hub',
    description:
      meta?.description || 'Anime website boilerplate build with PayloadCMS',
    openGraph: {
      title: meta?.title || 'Anime hub',
      description:
        meta?.description || 'Anime website boilerplate build with PayloadCMS',
    },
  };
}
