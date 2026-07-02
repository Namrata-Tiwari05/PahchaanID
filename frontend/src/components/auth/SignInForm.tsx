import React from 'react';
import { AlertCircle, Users, Hotel, Phone, ChevronRight, Key, ChevronLeft, ShieldCheck, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { STATES } from '../constants';

interface SignInFormProps {
  goTo: (target: any) => void;
  error: string;
  setError: (err: string) => void;
  loading: boolean;
  loginStep: 'phone' | 'otp';
  setLoginStep: (step: 'phone' | 'otp') => void;
  loginPhone: string;
  setLoginPhone: (phone: string) => void;
  loginOtp: string;
  setLoginOtp: (otp: string) => void;
  loginRole: 'manager' | 'owner' | 'admin' | 'superadmin';
  setLoginRole: (role: 'manager' | 'owner' | 'admin' | 'superadmin') => void;
  loginOtpHint: string;
  handleSendOtp: (e: React.FormEvent) => void;
  handleVerifyOtp: (e: React.FormEvent) => void;
  
  // Admin-specific props added to ensure functional integration
  adminSelectedState?: string;
  setAdminSelectedState?: (state: string) => void;
  adminTypedDistrict?: string;
  setAdminTypedDistrict?: (district: string) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  goTo,
  error,
  setError,
  loading,
  loginStep,
  setLoginStep,
  loginPhone,
  setLoginPhone,
  loginOtp,
  setLoginOtp,
  loginRole,
  setLoginRole,
  loginOtpHint,
  handleSendOtp,
  handleVerifyOtp,
  adminSelectedState = '',
  setAdminSelectedState = () => {},
  adminTypedDistrict = '',
  setAdminTypedDistrict = () => {},
}) => {
  return (
    <div id="screen-signin" className="block min-h-screen animate-screenEnter bg-[#F8FAFC] text-[#0F172A] font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Panel: Security Illustration & Trusted Badges */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-[#18385B] text-white relative overflow-hidden">
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
              <ShieldCheck size={14} className="text-white/80" /> Secure Terminal Session
            </div>
            <h1 className="text-4xl font-black tracking-tight leading-[1.1] mb-6">
              Authorized Portal Access.
            </h1>
            <p className="text-lg text-white/85 leading-relaxed mb-8">
              Authenticate via encrypted OTP tokens to access your compliance management systems, registers, and verification nodes.
            </p>
            
            <div className="space-y-4">
              {[
                'Hardware-independent digital guest registers',
                'Live district-level monitoring and compliance logs',
                'Double-encrypted session logging and audit trails',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-white/80 shrink-0" />
                  <span className="text-sm font-medium text-white/90">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 text-xs text-white/40 font-medium">
            © 2026 Pahchaan ID · Secured using AES-256 standards
          </div>
        </div>

        {/* Right Panel: Sign In Form */}
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-20 bg-white relative">
          <div className="w-full max-w-[420px]">
            
            {/* Navigation / Header */}
            <div className="mb-10 flex items-center justify-between">
              <button 
                onClick={() => {
                  if (loginStep === 'otp') {
                    setLoginStep('phone');
                    setError('');
                  } else {
                    goTo('portal-choice');
                  }
                }}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#475569] hover:text-[#0F172A] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl cursor-pointer transition-all outline-none border-none"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <img src="/logo.png" alt="Pahchaan ID" className="h-7 w-auto object-contain lg:hidden" />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight mb-2">
                {loginStep === 'phone' ? 'Sign in to Portal' : 'Verify OTP Code'}
              </h2>
              <p className="text-sm text-[#64748B]">
                {loginStep === 'phone' 
                  ? 'Identify your administrative role to continue.' 
                  : `Enter the verification OTP sent to +91 ${loginPhone}`}
              </p>
            </div>

            {error && (
              <div className="bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] p-4 rounded-2xl text-xs font-semibold flex items-start gap-2.5 mb-6">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {loginStep === 'phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                
                {/* Segment Selector for 2 Roles */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Select System Role</label>
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#F1F5F9] rounded-2xl">
                    <button 
                      type="button" 
                      onClick={() => { setLoginRole('manager'); setError(''); }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 border-none outline-none cursor-pointer ${
                        loginRole === 'manager' 
                          ? 'bg-white text-[#18385B] shadow-[0_4px_12px_rgba(0,0,0,0.05)]' 
                          : 'bg-transparent text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      <Users size={14} /> Manager
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setLoginRole('owner'); setError(''); }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 border-none outline-none cursor-pointer ${
                        loginRole === 'owner' 
                          ? 'bg-white text-[#18385B] shadow-[0_4px_12px_rgba(0,0,0,0.05)]' 
                          : 'bg-transparent text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      <Hotel size={14} /> Owner
                    </button>
                  </div>
                </div>

                {/* Mobile Number Input */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                      <Phone size={16} />
                    </span>
                    <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm font-bold text-[#64748B]">+91 </span>
                    <input 
                      type="tel"
                      value={loginPhone}
                      onChange={(e) => { setError(''); setLoginPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); }}
                      placeholder="XXXXX XXXXX"
                      required
                      className="w-full p-[12px_16px_12px_76px] border border-[#E2E8F0] rounded-xl font-bold text-sm text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white shadow-[0_4px_12px_rgba(24,56,91,0.1)] cursor-pointer border-none outline-none disabled:opacity-50"
                >
                  {loading ? 'Sending Request...' : 'Request Authentication Token'} <ChevronRight size={16} />
                </button>

              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                
                {/* OTP Code Input */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">OTP Token</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                      <Key size={16} />
                    </span>
                    <input 
                      type="text" 
                      maxLength={6}
                      value={loginOtp}
                      onChange={(e) => { setError(''); setLoginOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); }}
                      placeholder="Enter 6-digit OTP"
                      required
                      className="w-full p-[12px_16px_12px_42px] border border-[#E2E8F0] rounded-xl text-center font-bold tracking-[8px] text-lg text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                    />
                  </div>
                  
                  {loginOtpHint && (
                    <div className="p-3 bg-[#F8FAFC] rounded-xl border border-dashed border-[#18385B]/20 text-center">
                      <span className="text-[10px] text-[#64748B] font-bold block mb-1">DEVELOPMENT OTP HINT</span>
                      <strong className="text-base text-[#18385B] tracking-[4px] font-extrabold">{loginOtpHint}</strong>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white shadow-[0_4px_12px_rgba(24,56,91,0.1)] cursor-pointer border-none outline-none disabled:opacity-50"
                >
                  {loading ? 'Verifying Token...' : 'Verify Token & Access Panel'}
                </button>

                <div className="text-center">
                  <button 
                    type="button" 
                    onClick={() => { setLoginStep('phone'); setError(''); setLoginOtp(''); }}
                    className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] bg-transparent border-none outline-none cursor-pointer"
                  >
                    ← Edit phone number
                  </button>
                </div>

              </form>
            )}

            <p className="text-center mt-8 text-xs text-[#64748B]">
              New property? <a href="#" onClick={(e) => { e.preventDefault(); goTo('register'); }} className="text-[#18385B] font-bold hover:underline">Register here</a>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};
