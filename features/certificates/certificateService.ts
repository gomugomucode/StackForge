import { supabase } from '../../lib/supabase'
import type { CertificateRecord, VerificationResult } from './types'

// Mock storage for local fallback
const LOCAL_CERTS_KEY = 'stackforge_local_certificates'

function getLocalCertificates(): CertificateRecord[] {
  const cached = localStorage.getItem(LOCAL_CERTS_KEY)
  if (cached) {
    try {
      return JSON.parse(cached)
    } catch {
      return []
    }
  }
  return []
}

function saveLocalCertificate(cert: CertificateRecord) {
  const list = getLocalCertificates()
  list.push(cert)
  localStorage.setItem(LOCAL_CERTS_KEY, JSON.stringify(list))
}

export const certificateService = {
  /**
   * Fetch all certificates for the current logged in user (or fallback local certificates)
   */
  async getCertificates(userId?: string): Promise<CertificateRecord[]> {
    if (userId) {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .eq('user_id', userId)

        if (!error && data) {
          return data as CertificateRecord[]
        }
      } catch (e) {
        console.warn('Supabase fetch failed, falling back to local certificates:', e)
      }
    }

    // Fallback to local storage certificates
    const localCerts = getLocalCertificates()
    if (userId) {
      return localCerts.filter(c => c.user_id === userId)
    }
    return localCerts
  },

  /**
   * Generates and issues a new certificate for a specific technology track
   */
  async issueCertificate(
    userId: string,
    recipientName: string,
    techId: string,
    techLabel: string,
    topicsCompleted: number,
    totalTopics: number
  ): Promise<CertificateRecord> {
    const certId = `SF-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    
    const newCert: CertificateRecord = {
      id: crypto.randomUUID?.() || Math.random().toString(36).substring(2),
      user_id: userId,
      track_name: techLabel,
      tech_id: techId,
      certificate_id: certId,
      recipient_name: recipientName,
      issued_at: new Date().toISOString(),
      is_public: true,
      topics_completed: topicsCompleted,
      total_topics: totalTopics,
    }

    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert({
          id: newCert.id,
          user_id: newCert.user_id,
          track_name: newCert.track_name,
          tech_id: newCert.tech_id,
          certificate_id: newCert.certificate_id,
          recipient_name: newCert.recipient_name,
          issued_at: newCert.issued_at,
          is_public: newCert.is_public,
          topics_completed: newCert.topics_completed,
          total_topics: newCert.total_topics
        })
        .select()
        .single()

      if (!error && data) {
        return data as CertificateRecord
      }
    } catch (e) {
      console.warn('Failed to insert certificate into Supabase, saving locally:', e)
    }

    // Fallback to local storage saving
    saveLocalCertificate(newCert)
    return newCert
  },

  /**
   * Verifies a certificate by its unique verification code (certificate_id)
   */
  async verifyCertificate(certId: string): Promise<VerificationResult> {
    const cleanedId = certId.trim().toUpperCase()

    // Try Supabase first
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('certificate_id', cleanedId)
        .maybeSingle()

      if (!error && data) {
        return {
          valid: true,
          certificate: data as CertificateRecord,
          message: 'Certificate successfully verified via StackForge Registry.'
        }
      }
    } catch (e) {
      console.warn('Supabase verification failed, falling back to local check:', e)
    }

    // Check local certificates database
    const localCerts = getLocalCertificates()
    const found = localCerts.find(c => c.certificate_id === cleanedId)

    if (found) {
      return {
        valid: true,
        certificate: found,
        message: 'Certificate verified via Local Sandbox Registry.'
      }
    }

    return {
      valid: false,
      message: 'Certificate not found. Please verify the code and try again.'
    }
  }
}
