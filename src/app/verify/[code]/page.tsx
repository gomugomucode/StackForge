"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function VerifyCertificatePage() {
  const params = useParams();
  const [cert, setCert] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(`/api/certifications/verify?code=${params.code}`);
        if (res.ok) {
          const data = await res.json();
          setCert(data);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    verify();
  }, [params.code]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (error || !cert) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-2xl border border-border bg-card text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold">Invalid Certificate</h1>
          <p className="text-muted-foreground">The verification code provided is invalid or has expired.</p>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full p-12 rounded-3xl border-4 border-double border-primary bg-card shadow-2xl text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Award className="w-32 h-32 text-primary" />
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <Award className="w-16 h-16 text-yellow-500" />
          <h1 className="text-4xl font-black tracking-tight">Certificate of Completion</h1>
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>

        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            This is to certify that
          </p>
          <h2 className="text-3xl font-bold text-foreground uppercase tracking-wide">
            {cert.user.name || cert.user.email}
          </h2>
          <p className="text-lg text-muted-foreground">
            has successfully completed the
          </p>
          <h3 className="text-2xl font-bold text-primary">
            {cert.roadmap.title}
          </h3>
        </div>

        <div className="flex justify-between items-end pt-12 border-t border-border">
          <div className="text-left">
            <p className="text-xs font-bold uppercase text-muted-foreground">Issued On</p>
            <p className="text-sm font-medium">{new Date(cert.issuedAt).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase text-muted-foreground">Verification Code</p>
            <p className="text-sm font-mono font-medium">{cert.verificationCode}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm pt-4">
          <CheckCircle className="w-4 h-4" /> Verified Authentic
        </div>
      </div>
    </div>
  );
}
