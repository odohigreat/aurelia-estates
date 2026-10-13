import type { SupabaseClient } from '@supabase/supabase-js';
import type { Property } from '../../types';
import { getSupabase } from '../../lib/supabase';
import { createEnquirySchema, type PropertyEnquiry } from './enquirySchema';

// Ownership, status and timestamps are assigned by PostgreSQL, never the browser.
export async function submitPropertyEnquiry(
  draft: PropertyEnquiry,
  inventory: readonly Property[],
  expectedUserId: string,
  connect: () => Promise<SupabaseClient> = getSupabase,
): Promise<void> {
  const enquiry = createEnquirySchema(inventory).parse(draft);
  const client = await connect();
  const { data, error: authError } = await client.auth.getUser();
  if (authError || !data.user || data.user.id !== expectedUserId) {
    throw new Error('Your session has changed or expired. Sign in again before sending your enquiry.');
  }
  if (!data.user.email_confirmed_at) {
    throw new Error('Confirm your email address before sending an enquiry.');
  }
  const { error } = await client.from('property_enquiries').insert({
    property_id: enquiry.propertyId,
    full_name: enquiry.fullName,
    email: enquiry.email,
    message: enquiry.message,
  });
  if (error) {
    if (error.code === '42501') throw new Error('Enquiry submission is currently unavailable. Your enquiry has not been saved.');
    if (error.code === '23503' || error.code === '23514') throw new Error('This property is no longer available for enquiries. Refresh the listing before trying again.');
    // A lost response may follow a committed INSERT. Never automatically retry it.
    throw new Error('We could not confirm whether your enquiry was saved. Please check before sending it again.');
  }
}
