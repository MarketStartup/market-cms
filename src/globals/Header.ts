import type { GlobalConfig } from 'payload';

export const Header: GlobalConfig = {
   slug: 'header',
   access: {
      read: () => true,
   },
   fields: [
      {
         name: 'navItems',
         type: 'array',
         maxRows: 6,
         fields: [
            {
               name: 'label',
               type: 'text',
               required: true,
            },
            {
               name: 'href',
               type: 'text',
               required: true,
            },
         ],
      },
   ],
};
