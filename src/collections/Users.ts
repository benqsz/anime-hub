import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      required: true,
      unique: true,
      name: 'username',
      type: 'text',
    },
    {
      required: true,
      type: 'select',
      name: 'role',
      admin: {
        description: 'Only admins can assign admin or moderator roles.',
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Moderator',
          value: 'moderator',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      defaultValue: 'user',
    },
  ],
};
