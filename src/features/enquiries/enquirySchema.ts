import { z } from 'zod';
import type { Property } from '../../types';
import { findProperty } from '../properties/propertyLookup';

export function createEnquirySchema(inventory: readonly Property[]) {
  return z.object({
    propertyId: z.string().refine(id => Boolean(findProperty(inventory, id)), 'Choose a valid sample property.'),
    fullName: z.string().trim().min(2, 'Enter a name with at least 2 characters.').max(100, 'Use at most 100 characters.').refine(name => /\p{L}/u.test(name), 'Enter a name containing letters.'),
    email: z.string().trim().max(254, 'Use at most 254 characters.').email('Enter a valid email address.'),
    message: z.string().trim().min(10, 'Enter a message with at least 10 characters.').max(2000, 'Use at most 2,000 characters.').refine(message => /[\p{L}\p{N}]/u.test(message), 'Enter a meaningful enquiry message.'),
  });
}
export type PropertyEnquiry = z.infer<ReturnType<typeof createEnquirySchema>>;
