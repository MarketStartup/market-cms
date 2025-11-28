import { RoleConstant } from '@/lib/constants';
import type { CollectionConfig } from 'payload';

export const Instructors: CollectionConfig = {
   slug: 'instructors',
   admin: {
      useAsTitle: 'name',
   },
   versions: {
      drafts: {
         autosave: {
            interval: 2000,
         },
         validate: false,
      },
   },
   access: {
      read: () => true,
      create: ({ req }) => req.user?.role === RoleConstant.ADMIN,
      update: ({ req }) => req.user?.role === RoleConstant.ADMIN,
      delete: ({ req }) => req.user?.role === RoleConstant.ADMIN,
   },
   fields: [
      {
         name: 'name',
         type: 'text',
         required: true,
      },
      {
         name: 'bio',
         type: 'text',
         required: true,
      },
      {
         name: 'image',
         type: 'upload',
         relationTo: 'media',
      },
   ],
};
