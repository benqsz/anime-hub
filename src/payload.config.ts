import { postgresAdapter } from '@payloadcms/db-postgres';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Media } from '@/collections/Media';
import { Pages } from '@/collections/Pages';
import { Users } from '@/collections/Users';
import { ENV, IS_DEV } from '@/lib/utils';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const componentPath = (path: string) => `./components/payload/${path}`;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | Anime Hub',
      description: 'Admin panel Anime Hub',
      icons: [
        {
          rel: 'icon',
          type: 'image/ico',
          url: '/favicon.ico',
        },
      ],
    },
    autoLogin: IS_DEV
      ? {
          email: ENV('AUTOLOGIN_MAIL'),
          password: ENV('AUTOLOGIN_PASS'),
          prefillOnly: true,
        }
      : undefined,
    components: {
      graphics: {
        Icon: componentPath('icon'),
        Logo: componentPath('logo'),
      },
      beforeDashboard: [componentPath('before-dashboard')],
      beforeNavLinks: [componentPath('before-nav')],
    },
    avatar: {
      Component: componentPath('avatar'),
    },
  },
  globals: [],
  collections: [Users, Media, Pages],
  plugins: [
    seoPlugin({
      collections: [Pages.slug],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateURL: ({ doc }) => `/${doc.slug === 'home' ? '' : doc.slug}`,
      generateTitle: ({ doc }) => `${doc.title} | Anime Hub`,
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: ENV('DATABASE_URI'),
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  secret: ENV('PAYLOAD_SECRET'),
  editor: lexicalEditor(),
  sharp,
});
