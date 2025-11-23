import type { FieldHook } from 'payload';

export const formatSlug = (val: string): string =>
   val
      .trim()
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

export const formatSlugHook =
   (fallbackField: string): FieldHook =>
      ({ value, data, originalDoc }) => {
         if (typeof value === 'string' && value.length > 0) {
            return formatSlug(value);
         }
         const fallbackValue =
            (data && typeof data[fallbackField] === 'string' && data[fallbackField]) ||
            (originalDoc &&
               typeof originalDoc[fallbackField] === 'string' &&
               originalDoc[fallbackField]);

         if (typeof fallbackValue === 'string' && fallbackValue.length > 0) {
            return formatSlug(fallbackValue);
         }
         return value;
      };
