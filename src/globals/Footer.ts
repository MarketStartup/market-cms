import type { GlobalConfig } from 'payload';

export const Footer: GlobalConfig = {
   slug: 'footer',
   access: {
      read: () => true,
   },
   fields: [
      {
         type: 'tabs',
         tabs: [
            {
               label: 'Quick Links',
               fields: [
                  {
                     name: 'quickLinks',
                     type: 'array',
                     maxRows: 6,
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
                  },
               ]
            },
            {
               label: 'Policies',
               fields: [
                  {
                     name: 'policies',
                     type: 'array',
                     maxRows: 6,
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
                  },
               ]
            }
         ]
      }
   ],
};
