import { RoleConstant } from '@/lib/constants';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
    tokenExpiration: 60 * 60 * 24 * 7
  },
  access: {
    admin: ({ req }) => req.user?.role === RoleConstant.ADMIN,
    create: () => true,
    update: ({ req }) => req.user?.role === RoleConstant.ADMIN,
    delete: ({ req }) => req.user?.role === RoleConstant.ADMIN,
  },
  fields: [
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    {
      name: 'dob',
      label: 'Date of Birth',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Select the users date of birth.',
      },
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: RoleConstant.ADMIN },
        { label: 'User', value: RoleConstant.USER },
      ],
      admin: {
        description: 'Only users with the "Admin" role can access the CMS.',
      },
    },
  ],
};
