import { formatSlugHook } from '@/hooks/formatSlugHook';
import { RoleConstant } from '@/lib/constants';
import type { CollectionConfig } from 'payload';

export const Courses: CollectionConfig = {
   slug: 'courses',
   admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'category', 'price', 'level', 'updatedAt'],
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
         type: 'row',
         fields: [
            {
               name: 'title',
               type: 'text',
               required: true,
               admin: { width: '50%' },
            },
            {
               name: 'slug',
               type: 'text',
               required: true,
               unique: true,
               index: true,
               admin: {
                  description: 'Auto-generated from the title, but can be edited.',
                  width: '50%',
               },
               hooks: {
                  beforeValidate: [formatSlugHook('title')],
               },
            },
         ],
      },
      {
         type: 'tabs',
         tabs: [
            {
               label: 'Detail',
               fields: [
                  {
                     name: 'description',
                     type: 'textarea',
                     required: true,
                  },
                  {
                     name: 'image',
                     type: 'upload',
                     relationTo: 'media',
                     required: true,
                  },
                  {
                     type: 'row',
                     fields: [
                        {
                           name: 'rating',
                           type: 'number',
                           required: true,
                           min: 0,
                           max: 5,
                           admin: { width: '33.3%' },
                        },
                        {
                           name: 'review',
                           type: 'number',
                           required: true,
                           min: 0,
                           admin: { width: '33.3%' },
                        },
                        {
                           name: 'student',
                           type: 'number',
                           required: true,
                           min: 1000,
                           admin: {
                              description: 'min value: 1000',
                              width: '33.3%'
                           },
                        },
                     ],
                  },
                  {
                     type: 'row',
                     fields: [
                        {
                           name: 'price',
                           type: 'number',
                           required: true,
                           min: 0,
                        },
                        {
                           name: 'comparePrice',
                           type: 'number',
                           required: true,
                           min: 0,
                        },
                     ],
                  },
                  {
                     name: 'category',
                     type: 'text',
                     required: true,
                  },
                  {
                     name: 'instructor',
                     label: 'Instructor',
                     type: 'relationship',
                     relationTo: 'instructors',
                     required: true,
                  },
                  {
                     type: 'row',
                     fields: [
                        {
                           name: 'duration',
                           type: 'text',
                           required: true,
                           admin: {
                              description:
                                 'Example: "10 hours", "3 weeks", "Self-paced", etc.',
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
                           ],
                        },
                     ],
                  },
               ],
            },
            {
               label: "What you'll learn",
               fields: [
                  {
                     name: 'whatYouLearnPoints',
                     type: 'array',
                     required: true,
                     fields: [
                        {
                           name: 'title',
                           type: 'text',
                           required: true,
                        },
                     ],
                  },
               ],
            },
            {
               label: 'Skills',
               fields: [
                  {
                     name: 'skills',
                     type: 'array',
                     required: true,
                     fields: [
                        {
                           name: 'title',
                           type: 'text',
                           required: true,
                        },
                     ],
                  },
               ],
            },
            {
               label: 'Curriculum',
               fields: [
                  {
                     name: 'curriculums',
                     type: 'array',
                     required: true,
                     fields: [
                        {
                           name: 'sectionTitle',
                           type: 'text',
                           required: true,
                        },
                        {
                           name: 'lessons',
                           type: 'array',
                           required: true,
                           fields: [
                              {
                                 name: 'lessonTitle',
                                 type: 'text',
                                 required: true,
                              },
                              {
                                 name: 'lessonDuration',
                                 type: 'text',
                                 required: true,
                              },
                           ],
                        },
                     ],
                  },
               ],
            },
            {
               label: 'Reviews',
               fields: [
                  {
                     name: 'reviews',
                     type: 'array',
                     required: true,
                     fields: [
                        {
                           type: 'row',
                           fields: [
                              {
                                 name: 'rating',
                                 type: 'text',
                                 required: true,
                                 admin: {
                                    width: '50%',
                                 },
                              },
                              {
                                 name: 'reviewer',
                                 type: 'text',
                                 required: true,
                                 admin: {
                                    width: '50%',
                                 },
                              },
                           ],
                        },
                        {
                           name: 'review',
                           type: 'text',
                           required: true,
                        },
                     ],
                  },
               ],
            },
            {
               label: 'Batches',
               fields: [
                  {
                     name: 'batches',
                     type: 'join',
                     collection: 'batches', // which collection to join
                     on: 'course',          // field name in Batches that holds the relationship
                     // no `required` here; join is virtual
                  },
               ],
            },
         ],
      },
   ],
};
