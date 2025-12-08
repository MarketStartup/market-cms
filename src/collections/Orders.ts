import { RoleConstant } from '@/lib/constants';
import type { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
   slug: 'orders',
   admin: {
      useAsTitle: 'user',
      defaultColumns: ['user', 'batch', 'amount'],
   },
   access: {
      read: () => true,
      create: () => true,
      update: ({ req }) => req.user?.role === RoleConstant.ADMIN,
      delete: ({ req }) => req.user?.role === RoleConstant.ADMIN,
   },
   fields: [
      {
         type: 'row',
         fields: [
            {
               name: 'user',
               label: 'User',
               type: 'relationship',
               relationTo: 'users',
               required: true,
            },
            {
               name: 'batch',
               label: 'Batch',
               type: 'relationship',
               relationTo: 'batches',
               required: true,
            },
            {
               name: 'amount',
               type: 'number',
               required: true,
               admin: {
                  width: '50%',
               },
            },
         ],
      },
   ],
}
