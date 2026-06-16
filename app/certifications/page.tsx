"use client";
import React from 'react';
import { supabase } from '@/lib/core/services/supabase';
import { Trophy, Download, ShieldCheck, Award } from 'lucide-react';

interface Certificate {
  id: string;
  user_id: string;
  track_name: string;
  certificate_id: string;
  issued_at: string;
}

export default function CertificationEngine() {
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchCerts() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id);
      
      if (data) setCertificates(data);
      setLoading(false);
    }

    fetchCerts();
  }, []);

  const downloadCertificate = (cert: Certificate) => {
    // Implementation for PDF generation would go here
    alert(`Downloading certificate ${cert.certificate_id} for ${cert.track_name}...`);
  };

  if (loading) return <div className="p-8 text-center">Loading certifications...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Certifications</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Verify your skills and showcase your achievements.</p>
        </div>
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <Award className="w-8 h-8" />
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Certifications Yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">Complete courses and pass quizzes to earn your certificates.</p>
          <a href="/roadmaps" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Start Learning
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(cert => (
            <div key={cert.id} className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-400">{cert.certificate_id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{cert.track_name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Issued on {new Date(cert.issued_at).toLocaleDateString()}</p>
              <button 
                onClick={() => downloadCertificate(cert)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
