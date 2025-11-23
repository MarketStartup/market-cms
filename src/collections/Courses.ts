import { formatSlugHook } from '@/hooks/formatSlugHook';
import type { CollectionConfig } from 'payload';

export const Courses: CollectionConfig = {
   slug: 'courses',
   admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'category', 'price', 'level', 'updatedAt'],
   },
   access: {
      read: () => true,
      create: ({ req }) => req.user?.role === 'admin',
      update: ({ req }) => req.user?.role === 'admin',
      delete: ({ req }) => req.user?.role === 'admin',
   },
   fields: [
      {
         name: 'title',
         type: 'text',
         required: true,
      },
      {
         name: 'slug',
         type: 'text',
         required: true,
         unique: true,
         index: true,
         admin: {
            description: 'Auto-generated from the title, but can be edited.',
         },
         hooks: {
            beforeValidate: [formatSlugHook('title')],
         },
      },
      {
         name: 'description',
         type: 'textarea',
         required: true,
      },
      {
         name: 'category',
         type: 'text',
         required: true,
      },
      {
         name: 'price',
         type: 'number',
         required: true,
         min: 0,
      },
      {
         name: 'image',
         type: 'upload',
         relationTo: 'media',
         required: true,
      },
      {
         name: 'instructor',
         type: 'text',
         required: true,
      },
      {
         name: 'rating',
         type: 'number',
         required: true,
         min: 0,
         max: 5,
      },
      {
         name: 'students',
         type: 'number',
         required: true,
         min: 0,
      },
      {
         name: 'duration',
         type: 'text',
         required: true,
         admin: {
            description: 'Example: "10 hours", "3 weeks", "Self-paced", etc.',
         },
      },
      {
         name: 'level',
         type: 'select',
         required: true,
         options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
            { label: 'All Levels', value: 'all' },
         ],
      },
   ],
};
