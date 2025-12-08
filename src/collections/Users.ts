import { RoleConstant } from '@/lib/constants';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
    tokenExpiration: 60 * 60 * 24 * 7,
  },
  access: {
    admin: ({ req }) => req.user?.role === RoleConstant.ADMIN,
    create: () => true,
    update: ({ req }) => req.user?.role === RoleConstant.ADMIN,
    delete: ({ req }) => req.user?.role === RoleConstant.ADMIN,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Detail',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'firstName',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'lastName',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'mobile',
                  label: 'Mobile Number',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'dob',
                  label: 'Date of Birth',
                  type: 'date',
                  admin: {
                    description: 'Select the users date of birth.',
                    width: '50%',
                  },
                },
                {
                  name: 'state',
                  label: 'State',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'role',
                  type: 'select',
                  required: true,
                  defaultValue: RoleConstant.USER,
                  options: [
                    { label: 'Admin', value: RoleConstant.ADMIN },
                    { label: 'User', value: RoleConstant.USER },
                  ],
                  admin: {
                    description: 'Only users with the "Admin" role can access the CMS.',
                    width: '50%',
                  },
                },
              ],
            },

          ],
        },
        {
          label: 'Enrollments',
          fields: [
            {
              name: 'enrollments',
              label: 'Batches',
              type: 'join',
              collection: 'batches',
              on: 'users.user',
              admin: {
                defaultColumns: ['title', 'startDate', 'endDate'],
              },
            },
          ],
        },
      ],
    },
  ],
};
