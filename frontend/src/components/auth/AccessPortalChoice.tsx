import React from 'react';
import { Hotel, Key, ChevronLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PortalChoiceProps {
  goTo: (target: any) => void;
  setRegStep: (step: number) => void;
  setLoginStep: (step: 'phone' | 'otp') => void;
  setLoginRole: (role: 'manager' | 'owner' | 'admin' | 'superadmin') => void;
}

export const PortalChoice: React.FC<PortalChoiceProps> = ({
  goTo,
  setRegStep,
  setLoginStep,
  setLoginRole,
}) => {
  return (
    <div id="screen-portal-choice" className="block min-h-screen animate-screenEnter bg-[#F8FAFC] text-[#0F172A] font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Panel: Brand & Illustration (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-[#18385B] text-white relative overflow-hidden">
          {/* Subtle geometric background overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full border border-white/20 border-dashed animate-spin-[200s_linear_infinite]" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full border border-white/20 border-dashed animate-spin-[120s_linear_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,23,42,0.8)_80%)]" />
          </div>

          <div className="relative z-10">
            <a onClick={() => goTo('landing')} className="cursor-pointer inline-flex items-center h-10 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 transition-colors hover:bg-white/20">
              <img src="/logo.png" alt="Pahchaan ID" className="h-6 w-auto object-contain brightness-0 invert" />
            </a>
          </div>

          <div className="relative z-10 my-auto max-w-lg">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
              <ShieldCheck size={14} className="text-white/80" /> Government-Compliant ID Platform
            </div>
            <h1 className="text-4xl font-black tracking-tight leading-[1.1] mb-6">
              Simplifying Guest Verification & Security.
            </h1>
            <p className="text-lg text-white/85 leading-relaxed mb-8">
              Pahchaan ID offers modern hoteliers secure, paperless, instant guest verification connected straight to local compliancy logs.
            </p>
            
            <div className="space-y-4">
              {[
                'Instant Aadhaar, PAN & Passport check-ins',
                'State-level administrative regulatory alignment',
                'Encrypted audit trails and automated log closures',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white/80 shrink-0" />
                  <span className="text-sm font-medium text-white/90">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 text-xs text-white/40 font-medium">
            © 2026 Pahchaan ID · Data Encrypted At Rest
          </div>
        </div>

        {/* Right Panel: Portal Selection Form */}
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-20 bg-white relative">
          <div className="w-full max-w-[440px]">
            
            {/* Header / Back Link */}
            <div className="mb-10 flex items-center justify-between">
              <button 
                onClick={() => goTo('landing')}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#475569] hover:text-[#0F172A] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl cursor-pointer transition-all outline-none border-none"
              >
                <ChevronLeft size={14} /> Back to Home
              </button>
              <img src="/logo.png" alt="Pahchaan ID" className="h-7 w-auto object-contain lg:hidden" />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight mb-2">Select Access Portal</h2>
              <p className="text-sm text-[#64748B]">Choose your destination to register a property or sign in as staff.</p>
            </div>

            <div className="space-y-4">
              
              {/* Option 1: Owner Registration */}
              <div 
                className="group relative flex items-start gap-4 p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#18385B] bg-white cursor-pointer transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(24,56,91,0.05)] hover:-translate-y-1" 
                onClick={() => { setRegStep(0); goTo('register'); }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#18385B]/5">
                  <Hotel size={22} />
                </div>
                <div>
                  <h3 className="text-[15.5px] font-bold text-[#0F172A] mb-1 group-hover:text-[#18385B] transition-colors">Register New Property</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">Establish a new hotel profile with an active, government-compliant subscription.</p>
                </div>
              </div>

              {/* Option 2: Sign In Portal */}
              <div 
                className="group relative flex items-start gap-4 p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#18385B] bg-white cursor-pointer transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(24,56,91,0.05)] hover:-translate-y-1" 
                onClick={() => { setLoginStep('phone'); setLoginRole('manager'); goTo('signin'); }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#18385B]/5">
                  <Key size={22} />
                </div>
                <div>
                  <h3 className="text-[15.5px] font-bold text-[#0F172A] mb-1 group-hover:text-[#18385B] transition-colors">Access Portal Sign In</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">Login as Owner, Front Desk Manager, or District Administrator to access panels.</p>
                </div>
              </div>

            </div>

            <div className="mt-8 text-center text-xs text-[#94A3B8]">
              Need assistance? Contact portal administrator.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
