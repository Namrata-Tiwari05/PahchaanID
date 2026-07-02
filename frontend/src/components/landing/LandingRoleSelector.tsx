import React from 'react';
import { Hotel, Key, ChevronRight } from 'lucide-react';

interface LandingRoleSelectorProps {
  goTo: (target: any) => void;
  setRegStep: (step: number) => void;
  setLoginStep: (step: 'phone' | 'otp') => void;
  setLoginRole: (role: 'manager' | 'owner' | 'admin' | 'superadmin') => void;
}

export const LandingRoleSelector: React.FC<LandingRoleSelectorProps> = ({
  goTo,
  setRegStep,
  setLoginStep,
  setLoginRole,
}) => {
  return (
    <div className="max-w-[1200px] mt-20 mx-auto px-8" id="whats-inside">
      <div className="mb-12 text-center">
        <div className="bg-transparent text-[#64748B] p-0 font-bold text-xs tracking-wider uppercase mb-4 inline-flex items-center gap-1.5">— CHOOSE YOUR ROLE</div>
        <h2 className="text-[40px] font-black text-[#0F172A] mt-2 mb-4">Select Portal Account Role</h2>
        <p className="text-[16px] text-[#475569] max-w-[600px] leading-[1.6] mx-auto">New hotel owners register their property. Existing managers sign in to verify guests.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div 
          className="group relative overflow-hidden p-10 bg-white rounded-2xl border border-[#E2E8F0] text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-[#18385B] hover:shadow-lg" 
          id="pricing" 
          onClick={() => { setRegStep(0); goTo('register'); }}
        >
          <div className="w-16 h-16 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-105">
            <Hotel size={30} />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-3">Register New Property</h3>
          <p className="text-sm text-[#475569] leading-relaxed mb-2">Register your hotel on Pahchaan ID and start verifying guests with Aadhaar-backed IDs.</p>
          <p className="text-xs text-[#18385B] font-black uppercase tracking-wider mb-6">Pro Plan: ₹27,000 / year</p>
          <button className="px-6 py-3 rounded-xl font-bold text-xs transition-all inline-flex items-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white shadow-[0_4px_12px_rgba(24,56,91,0.15)] hover:-translate-y-0.5 active:translate-y-0 border-none outline-none cursor-pointer">
            Register New Property <ChevronRight size={14} />
          </button>
        </div>
        
        <div 
          className="group relative overflow-hidden p-10 bg-white rounded-2xl border border-[#E2E8F0] text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-[#18385B] hover:shadow-lg" 
          onClick={() => { setLoginStep('phone'); setLoginRole('manager'); goTo('signin'); }}
        >
          <div className="w-16 h-16 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-105">
            <Key size={30} />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-3">Access Portal Sign In</h3>
          <p className="text-sm text-[#475569] leading-relaxed mb-7">Manager or owner? Sign in to your panel to start guest verifications or manage your property.</p>
          <button className="px-6 py-3 rounded-xl font-bold text-xs transition-all inline-flex items-center gap-2 bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#18385B] hover:text-[#18385B] hover:-translate-y-0.5 active:translate-y-0 outline-none cursor-pointer">
            Access Portal Sign In <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
