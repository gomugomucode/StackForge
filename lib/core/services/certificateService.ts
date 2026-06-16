import { supabase } from '@/lib/supabase';

export const certificateService = {
  async issueCertificate(userId: string, contentSlug: string, metadata: any) {
    const verificationCode = `SF-${crypto.randomUUID().substring(0, 8).toUpperCase()}`;
    
    const { data, error } = await supabase
      .from('certificates')
      .insert({
        user_id: userId,
        content_slug: contentSlug,
        verification_code: verificationCode,
        metadata: metadata
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async verifyCertificate(code: string) {
    const { data, error } = await supabase
      .from('certificates')
      .select('*, profiles(*)')
      .eq('verification_code', code)
      .single();

    if (error || !data) return null;
    return data;
  }
};
