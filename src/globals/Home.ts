import type { GlobalConfig } from 'payload';
import {
   HomeBanner,
   Feature,
   WhyChooseUs,
} from '../blocks/home'
import { RoleConstant } from '@/lib/constants'
import { Faq } from '@/blocks/shared';

export const Home: GlobalConfig = {
   slug: 'home',
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
      update: ({ req }) => req.user?.role === RoleConstant.ADMIN,
   },
   fields: [
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
                        HomeBanner,
                        Feature,
                        WhyChooseUs,
                        Faq
                     ],
                  },
               ],
            },
         ],
      },
   ],
};
