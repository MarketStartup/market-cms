// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'
import {
   Banner,
   Faq,
   PromoBanner,
} from '../blocks/shared'
import {
   HomeBanner,
   Feature,
   WhyChooseUs,
} from '../blocks/home'
import {
   AboutUs,
   MissionVision,
   Team,
} from '../blocks/about'
import {
   CourseListing,
   CourseDetail,
} from '../blocks/course'

export const Pages: CollectionConfig = {
   slug: 'pages',
   admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'slug', 'updatedAt'],
   },
   versions: {
      drafts: true, // optional but nice for pages
   },
   fields: [
      // Basic page fields
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
         admin: {
            description: 'Used in the page URL (e.g. /about, /courses).',
         },
      },

      // Tabs wrapper
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
                        // Home
                        HomeBanner,
                        Feature,
                        WhyChooseUs,
                        // About
                        AboutUs,
                        MissionVision,
                        Team,
                        // Course
                        CourseListing,
                        CourseDetail,
                        // Shared
                        Banner,
                        Faq,
                        PromoBanner,
                     ],
                  },
               ],
            },
         ],
      },
   ],
}
