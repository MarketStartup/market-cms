import { RoleConstant } from '@/lib/constants';
import type { CollectionConfig } from 'payload';

export const Inquiries: CollectionConfig = {
   slug: 'inquiries',
   admin: {
      useAsTitle: 'fullName',
      defaultColumns: ['fullName', 'email'],
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
               name: 'fullName',
               type: 'text',
               required: true,
               admin: {
                  width: '50%',
               },
            },
            {
               name: 'email',
               type: 'email',
               required: true,
               admin: {
                  width: '50%',
               },
            },
            {
               name: 'subject',
               type: 'text',
               required: true,
               admin: {
                  width: '100%',
               },
            },
            {
               name: 'message',
               type: 'textarea',
               required: true,
               admin: {
                  width: '100%',
               },
            },
         ],
      },
   ],
}
