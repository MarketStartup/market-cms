import type { Block } from 'payload'
import { SectionHeading } from './shared'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const AboutUs: Block = {
   slug: 'aboutUs',
   labels: {
      singular: 'About Us',
      plural: 'About Us Sections',
   },
   fields: [
      { ...SectionHeading },
      {
         name: 'content',
         type: 'richText',
         editor: lexicalEditor({})
      },
   ],
}

export const MissionVision: Block = {
   slug: 'missionVision',
   labels: {
      singular: 'Mission & Vision',
      plural: 'Mission & Vision Sections',
   },
   fields: [
      {
         name: 'mission',
         type: 'textarea',
      },
      {
         name: 'vision',
         type: 'textarea',
      },
   ],
}

export const Team: Block = {
   slug: 'team',
   labels: {
      singular: 'Team',
      plural: 'Teams',
   },
   fields: [
      { ...SectionHeading },
      {
         name: 'members',
         type: 'array',
         fields: [
            {
               name: 'name',
               type: 'text',
               required: true
            },
            {
               name: 'designation',
               type: 'text'
            },
            {
               name: 'photo',
               type: 'upload',
               relationTo: 'media',
            },
            {
               name: 'bio',
               type: 'textarea',
            },
         ],
      },
   ],
}