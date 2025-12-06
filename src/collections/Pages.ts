// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'
import {
   Banner,
   Faq,
   PromoBanner,
   GeneralInformation
} from '../blocks/shared'
import {
   AboutUs,
   MissionVision,
   Team,
} from '../blocks/about'
import {
   CourseListing,
   CourseDetail,
   CourseDetailBanner,
} from '../blocks/course'
import { formatSlugHook } from '@/hooks/formatSlugHook'
import { RoleConstant, LayoutConstant } from '@/lib/constants'
import { ContactForm } from '@/blocks/contact'

export const Pages: CollectionConfig = {
   slug: 'pages',
   admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'slug', 'updatedAt'],
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
               admin: { width: '50%' }
            },
            {
               name: 'slug',
               type: 'text',
               required: true,
               unique: true,
               index: true,
               admin: {
                  description: 'Auto-generated from the title, but can be edited.',
                  width: '50%'
               },
               hooks: {
                  beforeValidate: [formatSlugHook('title')],
               },
            }
         ]
      },
      // {
      //    name: 'layout',
      //    type: 'select',
      //    required: true,
      //    options: [
      //       { label: 'Page', value: LayoutConstant.PAGE },
      //       { label: 'Course Detail', value: LayoutConstant.COURSE_DETAIL },
      //    ],
      //    admin: {
      //       description: 'Only users with the "Admin" role can access the CMS.',
      //    },
      // },
      {
         type: 'tabs',
         tabs: [
            {
               label: 'SEO',
               fields: [
                  {
                     name: 'metaTitle',
                     type: 'text',
                     required: true,
                  },
                  {
                     name: 'metaDescription',
                     type: 'textarea',
                     required: true
                  },
               ],
            },
            {
               label: 'Content',
               fields: [
                  {
                     name: 'blocks',
                     label: 'Page Blocks',
                     type: 'blocks',
                     blocks: [
                        // About
                        AboutUs,
                        MissionVision,
                        Team,
                        // Course
                        CourseListing,
                        CourseDetailBanner,
                        CourseDetail,
                        //Contact
                        ContactForm,
                        // Shared
                        Banner,
                        Faq,
                        PromoBanner,
                        GeneralInformation
                     ],
                  },
               ],
            },
         ],
      },
   ],
}
