import { lexicalEditor } from '@payloadcms/richtext-lexical';
import type { Block, Field } from 'payload'

export const SectionHeading: Field = {
   name: 'sectionHeading',
   type: 'group',
   fields: [
      {
         type: 'row',
         fields: [
            {
               name: 'badge',
               type: 'text',
               required: true,
               admin: {
                  width: '25%'
               }
            },
            {
               name: 'title',
               type: 'text',
               required: true,
               admin: {
                  width: '75%'
               }
            },
         ]
      },
      {
         name: 'subtitle',
         type: 'textarea',
      },
   ],
}

export const Cta = (name: string, label: string): Field => ({
   name,
   label,
   type: 'group',
   fields: [
      {
         type: 'row',
         fields: [
            {
               name: 'label',
               type: 'text',
               required: true,
               admin: {
                  width: '50%'
               }
            },
            {
               name: 'href',
               type: 'text',
               required: true,
               admin: {
                  width: '50%'
               }
            },
         ]
      }
   ],
});

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
      Cta('primaryAction', 'Primary Action'),
      Cta('secondaryAction', 'Secondary Action'),
   ],
}


export const GeneralInformation: Block = {
   slug: 'generalInformation',
   labels: {
      singular: 'General Information',
      plural: 'General Information Sections',
   },
   fields: [
      {
         name: 'content',
         type: 'richText',
         editor: lexicalEditor({})
      },
   ],
}