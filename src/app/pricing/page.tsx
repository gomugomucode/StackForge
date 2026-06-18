'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Rocket, Zap, ShieldCheck, Crown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';

const PLANS = [
  {
    id: 'FREE',
    name: 'The Explorer',
    price: '0',
    description: 'Perfect for those starting their journey.',
    features: ['Access to all Roadmaps', '5 AI Mentor messages/day', '1 Mock Interview/week', '1 Certification'],
    cta: 'Current Plan',
    highlight: false
  },
  {
    id: 'PRO',
    name: 'The Architect',
    price: '19',
    description: 'Accelerate your learning with premium tools.',
    features: ['Everything in Free', '100 AI Mentor messages/day', 'Unlimited Mock Interviews', 'Unlimited Certifications', 'Priority Support'],
    cta: 'Go Pro',
    highlight: true
  },
  {
    id: 'ENTERPRISE',
    name: 'The Forge Team',
    price: 'Custom',
    description: 'Scaling excellence across your organization.',
    features: ['Everything in Pro', 'Enterprise Dashboard', 'Dedicated Mentor', 'Team-based Roadmaps', 'Customized Content'],
    cta: 'Contact Sales',
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-16">
      <SectionHeader 
        title="Choose Your Forge Tier" 
        subtitle="Unlock the full potential of your career with professional-grade tools and unlimited mentorship."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PLANS.map((plan) => (
          <motion.div 
            key={plan.id}
            whileHover={{ y: -10 }}
            className={`p-8 rounded-3xl border transition-all flex flex-col ${
              plan.highlight 
                ? 'border-primary bg-primary/5 ring-2 ring-primary relative' 
                : 'border-border bg-card'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}

            <div className="space-y-2 mb-8">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-foreground">${plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-sm text-muted-foreground">/month</span>}
              </div>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              variant={plan.highlight ? 'primary' : 'outline'} 
              className="w-full gap-2"
              onClick={() => plan.id === 'PRO' ? alert("Redirecting to Stripe Checkout...") : null}
            >
              {plan.cta} {plan.highlight && <Rocket className="w-4 h-4" />}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-secondary/50 border border-border text-center space-y-4">
        <h4 className="font-bold text-lg">Frequently Asked Questions</h4>
        <p className="text-sm text-muted-foreground">
          Can I change my plan later? Yes, you can upgrade or downgrade your plan at any time from your profile settings.
        </p>
      </div>
    </div>
  );
}
