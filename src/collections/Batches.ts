import { RoleConstant } from '@/lib/constants';
import type { CollectionConfig } from 'payload';

export const Batches: CollectionConfig = {
   slug: 'batches',
   admin: {
      useAsTitle: 'title',
      defaultColumns: ['title'],
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
      update: () => true,
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
                           name: 'title',
                           type: 'text',
                           required: true,
                           admin: {
                              description: 'For admin view',
                              width: '100%',
                           },
                        },
                        {
                           name: 'name',
                           type: 'text',
                           required: true,
                           admin: {
                              description: 'This will show for user',
                              width: '100%',
                           },
                        },
                        {
                           name: 'course',
                           label: 'Course',
                           type: 'relationship',
                           relationTo: 'courses',
                           required: true, // one course per batch
                        },
                     ],
                  },
                  {
                     type: 'row',
                     fields: [
                        {
                           name: 'startDate',
                           type: 'date',
                           required: true,
                           admin: {
                              description: 'Start date of the batch.',
                              date: {
                                 pickerAppearance: 'dayOnly',
                              },
                              width: '50%',
                           },
                        },
                        {
                           name: 'endDate',
                           type: 'date',
                           required: true,
                           admin: {
                              description: 'End date of the batch.',
                              date: {
                                 pickerAppearance: 'dayOnly',
                              },
                              width: '50%',
                           },
                        },
                     ],
                  },
               ],
            },
            {
               label: 'User Enrollments',
               fields: [
                  {
                     name: 'users',
                     type: 'array',
                     fields: [
                        {
                           name: 'user',
                           label: 'User',
                           type: 'relationship',
                           relationTo: 'users',
                           required: true,
                        },
                        {
                           name: 'enrollmentDate',
                           label: 'Enrollment Date',
                           type: 'date',
                           required: true,
                           admin: {
                              description: 'Enrollment date of the batch.',
                              date: {
                                 pickerAppearance: 'dayOnly',
                              },
                           },
                        },
                        {
                           name: 'amountPaid',
                           type: 'number',
                           required: true,
                           min: 0,
                        },
                     ],
                  },
               ],
            },
         ],
      },
   ],
};
