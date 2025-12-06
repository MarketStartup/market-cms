import type { Block } from 'payload'
import { Cta, SectionHeading } from './shared'

export const HomeBanner: Block = {
   slug: 'homeBanner',
   labels: {
      singular: 'Home Banner',
      plural: 'Home Banners',
   },
   fields: [
      {
         name: 'title',
         type: 'text',
         required: true,
      },
      {
         name: 'titleHighlight',
         type: 'text',
         required: true,
      },
      {
         name: 'subtitle',
         type: 'textarea',
      },
      {
         name: 'image',
         type: 'upload',
         relationTo: 'media',
      },
      Cta('primaryAction', 'Primary Action'),
      Cta('secondaryAction', 'Secondary Action'),
   ],
}

export const Feature: Block = {
   slug: 'feature',
   labels: {
      singular: 'Feature',
      plural: 'Features',
   },
   fields: [
      { ...SectionHeading },
      {
         name: 'features',
         type: 'array',
         required: true,
         fields: [
            {
               name: 'icon',
               type: 'upload',
               relationTo: 'media',
            },
            {
               name: 'title',
               type: 'text',
               required: true,
            },
            {
               name: 'description',
               type: 'textarea',
               required: true,
            },
         ],
      },
   ],
}

export const WhyChooseUs: Block = {
   slug: 'whyChooseUs',
   labels: {
      singular: 'Why Choose Us',
      plural: 'Why Choose Us Sections',
   },
   fields: [
      { ...SectionHeading },
      {
         name: 'image',
         type: 'upload',
         relationTo: 'media',
      },
      {
         name: 'points',
         type: 'array',
         required: true,
         fields: [
            {
               name: 'title',
               type: 'text',
               required: true,
            },
            {
               name: 'description',
               type: 'textarea',
            },
         ],
      },
   ],
}