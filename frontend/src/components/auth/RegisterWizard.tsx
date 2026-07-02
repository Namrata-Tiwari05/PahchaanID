import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Key, 
  Hotel, 
  MapPin, 
  Building, 
  Hash, 
  Map, 
  Shield, 
  BarChart3, 
  Users, 
  Headphones, 
  CreditCard,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { STATES } from '../constants';

interface RegisterWizardProps {
  goTo: (target: any) => void;
  error: string;
  setError: (err: string) => void;
  loading: boolean;
  regStep: number;
  setRegStep: (step: number) => void;
  regPersonal: { fullName: string; mobile: string; email: string };
  setRegPersonal: (personal: any) => void;
  regOtp: string;
  setRegOtp: (otp: string) => void;
  regOtpHint: string;
  regHotel: { name: string; address: string; city: string; state: string; pincode: string; districtId: string };
  setRegHotel: (hotel: any) => void;
  regDistricts: any[];
  districtsLoading: boolean;
  showPayConfirm: boolean;
  setShowPayConfirm: (show: boolean) => void;
  handleRegPersonalNext: (e: React.FormEvent) => void;
  handleRegOtpVerify: (e: React.FormEvent) => void;
  handleRegHotelNext: (e: React.FormEvent) => void;
  handleStateChange: (state: string) => void;
  handleRegPaymentConfirm: () => void;
}

export const RegisterWizard: React.FC<RegisterWizardProps> = ({
  goTo,
  error,
  setError,
  loading,
  regStep,
  setRegStep,
  regPersonal,
  setRegPersonal,
  regOtp,
  setRegOtp,
  regOtpHint,
  regHotel,
  setRegHotel,
  regDistricts,
  districtsLoading,
  showPayConfirm,
  setShowPayConfirm,
  handleRegPersonalNext,
  handleRegOtpVerify,
  handleRegHotelNext,
  handleStateChange,
  handleRegPaymentConfirm,
}) => {
  return (
    <div id="screen-register" className="block min-h-screen animate-screenEnter bg-[#F8FAFC] text-[#0F172A] font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Panel: Progress Tracker & Context */}
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

          {/* Stepper Display */}
          <div className="relative z-10 my-auto max-w-md space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <ShieldCheck size={14} className="text-white/80" /> Property Onboarding Wizard
            </div>
            
            <h1 className="text-3xl font-black tracking-tight leading-tight">
              {regStep === 0 && 'Tell us about yourself.'}
              {regStep === 1 && 'Confirm your mobile number.'}
              {regStep === 2 && 'Register your property.'}
              {regStep === 3 && 'Activate your system access.'}
            </h1>

            <div className="relative border-l border-white/10 ml-3.5 pl-6 space-y-6">
              {[
                { step: 0, label: 'Owner Details', desc: 'Verify personal profile data' },
                { step: 1, label: 'Phone Verification', desc: 'Secure phone check via OTP' },
                { step: 2, label: 'Property Profile', desc: 'Hotel details & district logs' },
                { step: 3, label: 'Payment & Activation', desc: 'Select plan and activate node' },
              ].map((item) => {
                const isCompleted = regStep > item.step;
                const isActive = regStep === item.step;
                return (
                  <div key={item.step} className="relative">
                    <span className={`absolute -left-[35px] top-0 w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${
                      isCompleted ? 'bg-white text-[#18385B] border-white' : isActive ? 'bg-[#18385B] border-white text-white scale-110 shadow-lg' : 'bg-[#18385B] border-white/20 text-white/40'
                    }`}>
                      {isCompleted ? <Check size={10} strokeWidth={4} /> : item.step + 1}
                    </span>
                    <div className="transition-opacity duration-300">
                      <h4 className={`text-xs font-bold ${isActive ? 'text-white' : 'text-white/60'}`}>{item.label}</h4>
                      <p className="text-[10px] text-white/45 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 text-xs text-white/40 font-medium">
            © 2026 Pahchaan ID · Encryption node initialized
          </div>
        </div>

        {/* Right Panel: Step forms */}
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-20 bg-white relative">
          <div className="w-full max-w-[420px]">
            
            {/* Header / Back Navigation */}
            <div className="mb-10 flex items-center justify-between">
              <button 
                onClick={() => {
                  if (regStep > 0 && regStep !== 2) {
                    setRegStep(regStep - 1);
                    setError('');
                  } else {
                    goTo('portal-choice');
                  }
                }}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#475569] hover:text-[#0F172A] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl cursor-pointer transition-all outline-none border-none"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <span className="text-xs font-bold text-[#64748B] lg:hidden">Step {regStep + 1} of 4</span>
            </div>

            <div className="mb-8 lg:hidden">
              <h2 className="text-xl font-black text-[#0F172A]">
                {regStep === 0 && 'Owner Details'}
                {regStep === 1 && 'Confirm Phone'}
                {regStep === 2 && 'Property Profile'}
                {regStep === 3 && 'Activate Access'}
              </h2>
            </div>

            {error && (
              <div className="bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] p-4 rounded-2xl text-xs font-semibold flex items-start gap-2.5 mb-6">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 0: Personal details */}
            {regStep === 0 && (
              <form onSubmit={handleRegPersonalNext} className="space-y-5">
                
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Owner Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                      <User size={16} />
                    </span>
                    <input 
                      type="text" 
                      value={regPersonal.fullName}
                      onChange={(e) => { setError(''); setRegPersonal({ ...regPersonal, fullName: e.target.value }); }}
                      placeholder="Rajesh Kumar Sharma"
                      required
                      className="w-full p-[12px_16px_12px_42px] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                      <Phone size={16} />
                    </span>
                    <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm font-bold text-[#64748B]">+91 </span>
                    <input 
                      type="tel"
                      value={regPersonal.mobile}
                      onChange={(e) => { setError(''); setRegPersonal({ ...regPersonal, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }); }}
                      placeholder="XXXXX XXXXX"
                      required
                      className="w-full p-[12px_16px_12px_76px] border border-[#E2E8F0] rounded-xl font-bold text-sm text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Email Address (Optional)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                      <Mail size={16} />
                    </span>
                    <input 
                      type="email" 
                      value={regPersonal.email}
                      onChange={(e) => { setError(''); setRegPersonal({ ...regPersonal, email: e.target.value }); }}
                      placeholder="owner@hotel.com"
                      className="w-full p-[12px_16px_12px_42px] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white shadow-[0_4px_12px_rgba(24,56,91,0.1)] cursor-pointer border-none outline-none disabled:opacity-50"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'} <ChevronRight size={16} />
                </button>

              </form>
            )}

            {/* STEP 1: OTP Verification */}
            {regStep === 1 && (
              <form onSubmit={handleRegOtpVerify} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Enter Verification OTP</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                      <Key size={16} />
                    </span>
                    <input 
                      type="text" 
                      maxLength={6}
                      value={regOtp}
                      onChange={(e) => { setError(''); setRegOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); }}
                      placeholder="Enter 6-digit OTP"
                      required
                      className="w-full p-[12px_16px_12px_42px] border border-[#E2E8F0] rounded-xl text-center font-bold tracking-[8px] text-lg text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                    />
                  </div>
                  
                  {regOtpHint && (
                    <div className="p-3 bg-[#F8FAFC] rounded-xl border border-dashed border-[#18385B]/20 text-center">
                      <span className="text-[10px] text-[#64748B] font-bold block mb-1">DEVELOPMENT OTP HINT</span>
                      <strong className="text-base text-[#18385B] tracking-[4px] font-extrabold">{regOtpHint}</strong>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white shadow-[0_4px_12px_rgba(24,56,91,0.1)] cursor-pointer border-none outline-none disabled:opacity-50"
                >
                  {loading ? 'Verifying OTP...' : 'Verify & Continue'} <Check size={16} />
                </button>

              </form>
            )}

            {/* STEP 2: Hotel Details */}
            {regStep === 2 && (
              <form onSubmit={handleRegHotelNext} className="space-y-5">
                
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Hotel Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                      <Hotel size={16} />
                    </span>
                    <input 
                      type="text" 
                      value={regHotel.name}
                      onChange={(e) => { setError(''); setRegHotel({ ...regHotel, name: e.target.value }); }}
                      placeholder="The Palace Residency"
                      required
                      className="w-full p-[12px_16px_12px_42px] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Property Address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                      <MapPin size={16} />
                    </span>
                    <input 
                      type="text" 
                      value={regHotel.address}
                      onChange={(e) => { setError(''); setRegHotel({ ...regHotel, address: e.target.value }); }}
                      placeholder="123, Hazratganj"
                      required
                      className="w-full p-[12px_16px_12px_42px] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">City</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <Building size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={regHotel.city}
                        onChange={(e) => setRegHotel({ ...regHotel, city: e.target.value })}
                        placeholder="Lucknow"
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Pincode</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <Hash size={14} />
                      </span>
                      <input 
                        type="text" 
                        maxLength={6}
                        value={regHotel.pincode}
                        onChange={(e) => setRegHotel({ ...regHotel, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        placeholder="226001"
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">State</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <Map size={14} />
                      </span>
                      <select 
                        value={regHotel.state}
                        onChange={(e) => handleStateChange(e.target.value)}
                        required
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none transition-all cursor-pointer"
                      >
                        <option value="">Select State</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">District / City Log</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <Map size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={regHotel.districtId}
                        onChange={(e) => { setError(''); setRegHotel({ ...regHotel, districtId: e.target.value }); }}
                        placeholder="Enter district name"
                        required
                        disabled={!regHotel.state}
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none disabled:bg-[#F1F5F9] disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white shadow-[0_4px_12px_rgba(24,56,91,0.1)] cursor-pointer border-none outline-none disabled:opacity-50"
                >
                  {loading ? 'Registering Hotel...' : 'Continue to Payment'} <ChevronRight size={16} />
                </button>

              </form>
            )}

            {/* STEP 3: Choose Plan / Sub */}
            {regStep === 3 && (
              <div className="space-y-6">
                
                <div className="bg-[#18385B] rounded-2xl p-6 text-white text-center relative overflow-hidden shadow-md">
                  <div className="inline-flex items-center gap-2 bg-white/10 p-[4px_12px] rounded-full text-xs font-bold mb-3 uppercase tracking-wider">✦ PRO PLAN SUBSCRIPTION</div>
                  <div className="text-4xl font-black flex items-center justify-center gap-1"><span className="text-xl">₹</span>27,000</div>
                  <div className="text-white/80 text-xs mt-1">per year · billed annually</div>
                </div>

                <div className="border border-[#E2E8F0] rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-[#0F172A]">Included Package Features:</h4>
                  <div className="grid grid-cols-2 gap-3.5">
                    {[
                      { icon: <Shield size={14} className="text-[#18385B]" />, text: 'ID Verification' },
                      { icon: <Phone size={14} className="text-[#18385B]" />, text: 'Instant Check-In' },
                      { icon: <Key size={14} className="text-[#18385B]" />, text: 'AES-256 Logs' },
                      { icon: <Users size={14} className="text-[#18385B]" />, text: 'Unlimited Guests' },
                      { icon: <BarChart3 size={14} className="text-[#18385B]" />, text: 'Dashboard Analytics' },
                      { icon: <Headphones size={14} className="text-[#18385B]" />, text: 'Priority Support' },
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#475569]">
                        {feat.icon}
                        <span>{feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_2fr] gap-3">
                  <button 
                    onClick={() => setRegStep(2)}
                    className="py-3 rounded-xl font-bold text-xs transition-all inline-flex items-center justify-center gap-1.5 bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] cursor-pointer outline-none"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button 
                    onClick={() => setShowPayConfirm(true)}
                    className="py-3 rounded-xl font-bold text-xs transition-all inline-flex items-center justify-center gap-1.5 bg-[#18385B] hover:bg-[#0F243A] text-white shadow-[0_4px_12px_rgba(24,56,91,0.15)] cursor-pointer border-none outline-none"
                  >
                    <CreditCard size={16} /> Pay & Initialize Node
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* Payment confirmation modal */}
      {showPayConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-5 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-[360px] w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#E2E8F0]">
            <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center mx-auto mb-5">
              <CreditCard size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#0F172A]">Initialize Subscription</h3>
            <p className="text-xs text-[#64748B] leading-relaxed mb-6">
              You are subscribing to the Pro Plan for ₹27,000/year. Payment credentials will bypass in development environments.
            </p>

            <div className="flex gap-3">
              <button 
                className="py-2.5 rounded-xl font-bold text-xs transition-all bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] flex-1 justify-center cursor-pointer outline-none" 
                onClick={() => setShowPayConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="py-2.5 rounded-xl font-bold text-xs transition-all bg-[#18385B] hover:bg-[#0F243A] text-white flex-1 justify-center cursor-pointer border-none outline-none" 
                onClick={handleRegPaymentConfirm}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
