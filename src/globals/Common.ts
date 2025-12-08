import type { GlobalConfig } from 'payload';

export const Common: GlobalConfig = {
   slug: 'common',
   access: {
      read: () => true,
   },
   fields: [
      {
         type: 'row',
         fields: [
            {
               name: 'logo',
               type: 'upload',
               relationTo: 'media',
               required: true,
               admin: {
                  width: '50%'
               }
            },
            {
               name: 'footerDescription',
               label: 'Footer Description',
               type: 'text',
               required: true,
               maxLength: 100,
               admin: {
                  description: 'max lenght: 100 characters',
                  width: '100%'
               }
            },
         ],
      },
      {
         type: 'tabs',
         tabs: [
            {
               label: 'Contact',
               fields: [
                  {
                     type: 'row',
                     fields: [
                        {
                           name: 'emails',
                           type: 'array',
                           fields: [
                              {
                                 name: 'email',
                                 type: 'email',
                                 required: true,
                                 admin: {
                                    width: '50%'
                                 }
                              },
                           ]
                        },
                        {
                           name: 'mobiles',
                           label: 'Mobile Numbers',
                           type: 'array',
                           fields: [
                              {
                                 name: 'mobile',
                                 type: 'number',
                                 required: true,
                                 admin: {
                                    width: '50%'
                                 }
                              },
                           ]
                        },
                        {
                           name: 'address',
                           type: 'textarea',
                           required: true,
                           admin: {
                              width: '100%'
                           }
                        },
                     ]
                  }
               ],
            },
            {
               label: 'Social Links',
               fields: [
                  {
                     type: 'row',
                     fields: [
                        {
                           name: 'socials',
                           label: 'Social Links',
                           type: 'array',
                           fields: [
                              {
                                 name: 'icon',
                                 type: 'upload',
                                 relationTo: 'media',
                                 required: true,
                                 admin: {
                                    description: 'white icon recomended',
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
                        },
                     ]
                  }
               ],
            },
         ]
      }
   ]
}