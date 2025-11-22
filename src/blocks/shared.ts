// src/blocks/pageBlocks.ts
import type { Block, Field } from 'payload'

export const SectionHeading: Field = {
   name: 'sectionHeading',
   type: 'group',
   fields: [
      {
         name: 'badge',
         type: 'text',
         required: true,
      },
      {
         name: 'title',
         type: 'text',
         required: true,
      },
      {
         name: 'subtitle',
         type: 'textarea',
      },
   ],
}

export const Banner: Block = {
   slug: 'banner',
   labels: {
      singular: 'Banner',
      plural: 'Banners',
   },
   fields: [
      {
         name: 'title',
         type: 'text',
         required: true,
      },
      {
         name: 'subtitle',
         type: 'text',
      },
   ],
}

export const Faq: Block = {
   slug: 'faq',
   labels: {
      singular: 'FAQ',
      plural: 'FAQs',
   },
   fields: [
      { ...SectionHeading },
      {
         name: 'items',
         type: 'array',
         fields: [
            {
               name: 'question',
               type: 'text',
               required: true
            },
            {
               name: 'answer',
               type: 'textarea',
               required: true
            },
         ],
      },
   ],
}

export const PromoBanner: Block = {
   slug: 'promoBanner',
   labels: {
      singular: 'Promo Banner',
      plural: 'Promo Banners',
   },
   fields: [
      { ...SectionHeading },
      {
         name: 'description',
         type: 'textarea',
      },
   ],
}
