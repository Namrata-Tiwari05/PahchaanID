import React from 'react';
import { 
  Shield, 
  BarChart3, 
  Hotel, 
  Star, 
  LogOut, 
  AlertCircle, 
  Users, 
  Heart, 
  Briefcase, 
  GraduationCap, 
  ChevronRight, 
  IdCard, 
  FileText, 
  School, 
  ShieldCheck, 
  MapPin,
  X,
  Phone
} from 'lucide-react';
import { 
  getGuestDetailName, 
  getGuestDetailAge, 
  getGuestDetailAddress 
} from '../constants';

interface ManagerDashboardProps {
  logout: () => void;
  profile: any;
  managerTab: 'verify' | 'history' | 'details' | 'subscription';
  setManagerTab: (tab: 'verify' | 'history' | 'details' | 'subscription') => void;
  resetVerificationForm: () => void;
  error: string;
  setError: (err: string) => void;
  verifyType: 'choose' | 'family' | 'couple' | 'pro' | 'student' | 'done';
  setVerifyType: (type: 'choose' | 'family' | 'couple' | 'pro' | 'student' | 'done') => void;
  managerVerifications: any[];
  primaryIdType: string;
  setPrimaryIdType: (type: string) => void;
  primaryIdNumber: string;
  setPrimaryIdNumber: (num: string) => void;
  adults: number;
  setAdults: (num: number) => void;
  children: number;
  setChildren: (num: number) => void;
  purpose: string;
  setPurpose: (val: string) => void;
  coupleId1Type: string;
  setCoupleId1Type: (type: string) => void;
  coupleId1Number: string;
  setCoupleId1Number: (num: string) => void;
  coupleId2Type: string;
  setCoupleId2Type: (type: string) => void;
  coupleId2Number: string;
  setCoupleId2Number: (num: string) => void;
  proIdType: string;
  setProIdType: (type: string) => void;
  proIdNumber: string;
  setProIdNumber: (num: string) => void;
  studentIdType: string;
  setStudentIdType: (type: string) => void;
  studentIdNumber: string;
  setStudentIdNumber: (num: string) => void;
  institution: string;
  setInstitution: (val: string) => void;
  verificationResult: any;
  selectedHistoryItem: any;
  setSelectedHistoryItem: (item: any) => void;
  handleVerificationSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  logout,
  profile,
  managerTab,
  setManagerTab,
  resetVerificationForm,
  error,
  setError,
  verifyType,
  setVerifyType,
  managerVerifications,
  primaryIdType,
  setPrimaryIdType,
  primaryIdNumber,
  setPrimaryIdNumber,
  adults,
  setAdults,
  children,
  setChildren,
  purpose,
  setPurpose,
  coupleId1Type,
  setCoupleId1Type,
  coupleId1Number,
  setCoupleId1Number,
  coupleId2Type,
  setCoupleId2Type,
  coupleId2Number,
  setCoupleId2Number,
  proIdType,
  setProIdType,
  proIdNumber,
  setProIdNumber,
  studentIdType,
  setStudentIdType,
  studentIdNumber,
  setStudentIdNumber,
  institution,
  setInstitution,
  verificationResult,
  selectedHistoryItem,
  setSelectedHistoryItem,
  handleVerificationSubmit,
  loading,
}) => {
  return (
    <div id="screen-manager-dashboard" className="block min-h-screen animate-screenEnter bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* Header */}
      <nav className="bg-white border-b border-[#E2E8F0] px-8 h-16 flex items-center justify-between sticky top-0 z-[100] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <a onClick={() => { setManagerTab('verify'); resetVerificationForm(); }} className="cursor-pointer inline-flex items-center h-9 bg-white px-3 py-1 rounded-xl transition-transform hover:scale-[1.02]">
          <img src="/logo.png" alt="Pahchaan ID" className="h-full w-auto object-contain" />
        </a>
        <div className="flex gap-4 items-center">
          <div className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-3 py-1.5 rounded-xl border border-[#E2E8F0]">
            Manager · {profile?.name || 'Manager'}
          </div>
          <button className="px-4 py-2 rounded-xl font-bold text-xs transition-colors bg-transparent text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] border-none outline-none cursor-pointer" onClick={logout}>Sign Out</button>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[calc(100vh-64px)]">
        
        {/* Sidebar */}
        <div className="bg-white border-r border-[#E2E8F0] p-6 space-y-6">
          <div>
            <div className="text-[10px] font-black text-[#94A3B8] tracking-wider uppercase mb-3">Front Desk Console</div>
            <div 
              className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-bold cursor-pointer transition-colors ${
                managerTab === 'verify' ? 'bg-[#18385B]/5 text-[#18385B]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`} 
              onClick={() => { setManagerTab('verify'); resetVerificationForm(); }}
            >
              <Shield size={16} />
              Verification Desk
            </div>
            <div 
              className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-bold cursor-pointer transition-colors mt-1 ${
                managerTab === 'history' ? 'bg-[#18385B]/5 text-[#18385B]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`} 
              onClick={() => setManagerTab('history')}
            >
              <BarChart3 size={16} />
              Stay Registry
            </div>
            <div 
              className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-bold cursor-pointer transition-colors mt-1 ${
                managerTab === 'details' ? 'bg-[#18385B]/5 text-[#18385B]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`} 
              onClick={() => setManagerTab('details')}
            >
              <Hotel size={16} />
              Hotel Profile
            </div>
            <div 
              className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-bold cursor-pointer transition-colors mt-1 ${
                managerTab === 'subscription' ? 'bg-[#18385B]/5 text-[#18385B]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`} 
              onClick={() => setManagerTab('subscription')}
            >
              <Star size={16} />
              Pro Plan Status
            </div>
          </div>
          
          <div className="border-t border-[#F1F5F9] pt-6">
            <div className="text-[10px] font-black text-[#94A3B8] tracking-wider uppercase mb-3">Account</div>
            <div className="flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer" onClick={logout}>
              <LogOut size={16} />
              Sign Out
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="p-8 space-y-8">
          
          {error && (
            <div className="bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" /> {error}
            </div>
          )}

          {/* TAB: VERIFY */}
          {managerTab === 'verify' && (
            <div className="max-w-[600px] space-y-6">
              
              {/* CHOOSE GUEST TYPE */}
              {verifyType === 'choose' && (
                <>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B]">Front Desk Desk</p>
                    <h1 className="text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">Instant Check-In Verification</h1>
                    <p className="text-xs text-[#64748B] mt-1">Select the guest profile to begin identity scan.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { type: 'family', label: 'Family Check-in', desc: 'Primary guest ID + total adults and children count', icon: <Users size={20} /> },
                      { type: 'couple', label: 'Couple Verification', desc: 'Required Aadhaar/Gov ID checks for both guests', icon: <Heart size={20} /> },
                      { type: 'pro', label: 'Corporate Guest', desc: 'Verification for working professionals and company visits', icon: <Briefcase size={20} /> },
                      { type: 'student', label: 'Academic Guest', desc: 'Verified ID plus student educational credentials log', icon: <GraduationCap size={20} /> },
                    ].map((item) => (
                      <div 
                        key={item.type}
                        onClick={() => setVerifyType(item.type as any)}
                        className="flex items-center gap-4 p-5 bg-white border border-[#E2E8F0] hover:border-[#18385B] rounded-2xl cursor-pointer transition-all hover:shadow-md group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-[#0F172A]">{item.label}</h4>
                          <p className="text-xs text-[#64748B] mt-0.5">{item.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-[#94A3B8] group-hover:text-[#18385B]" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex gap-4 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="text-[#18385B] bg-[#18385B]/5 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                        <BarChart3 size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A]">Property Log Stats</h4>
                        <p className="text-[11px] text-[#64748B] mt-0.5">{managerVerifications.length} verifications logged for this property.</p>
                      </div>
                    </div>
                    <button 
                      className="px-3 py-1.5 rounded-lg font-bold text-xs bg-transparent text-[#18385B] hover:bg-[#F1F5F9] transition-colors border-none cursor-pointer outline-none flex items-center gap-1" 
                      onClick={() => setManagerTab('history')}
                    >
                      View Log <ChevronRight size={13} />
                    </button>
                  </div>
                </>
              )}

              {/* FAMILY FORM */}
              {verifyType === 'family' && (
                <form onSubmit={handleVerificationSubmit} className="space-y-6 bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] bg-transparent border-none p-0 cursor-pointer" onClick={resetVerificationForm}>&larr; Back</button>
                    <span className="text-xs text-[#E2E8F0]">|</span>
                    <span className="text-xs font-bold text-[#18385B]">Family Profile Form</span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Select Primary ID Type</label>
                    <div className="flex gap-2 flex-wrap">
                      {['aadhaar', 'pan', 'licence', 'passport', 'voter'].map(t => (
                        <button 
                          key={t} 
                          type="button" 
                          className={`capitalize px-3 py-1.5 rounded-lg font-bold transition-all text-[11px] border-none cursor-pointer ${
                            primaryIdType === t ? 'bg-[#18385B] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                          }`} 
                          onClick={() => setPrimaryIdType(t)}
                        >
                          {t === 'licence' ? 'Driving License' : t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Primary Member ID Number</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <IdCard size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={primaryIdNumber} 
                        onChange={(e) => setPrimaryIdNumber(e.target.value)} 
                        placeholder={`Enter primary guest's ${primaryIdType.toUpperCase()}`}
                        required 
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC] space-y-4">
                    <h4 className="text-xs font-bold text-[#0F172A]">Number of Members</h4>
                    
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                      <div>
                        <strong className="text-xs text-[#0F172A] block">Adults</strong>
                        <span className="text-[10px] text-[#64748B]">Aged 18 and older</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button type="button" className="w-8 h-8 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] font-bold text-xs flex items-center justify-center cursor-pointer" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                        <span className="text-xs font-extrabold w-4 text-center">{adults}</span>
                        <button type="button" className="w-8 h-8 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] font-bold text-xs flex items-center justify-center cursor-pointer" onClick={() => setAdults(adults + 1)}>+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <strong className="text-xs text-[#0F172A] block">Children</strong>
                        <span className="text-[10px] text-[#64748B]">Under age of 18</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button type="button" className="w-8 h-8 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] font-bold text-xs flex items-center justify-center cursor-pointer" onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                        <span className="text-xs font-extrabold w-4 text-center">{children}</span>
                        <button type="button" className="w-8 h-8 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] font-bold text-xs flex items-center justify-center cursor-pointer" onClick={() => setChildren(children + 1)}>+</button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Purpose of Visit (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <FileText size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={purpose} 
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Tourism, Business, Leisure"
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-[#18385B]/5 text-[#18385B] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                    <Users size={14} /> Registered stay for {adults + children} guests ({adults} A + {children} C)
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-xs transition-all inline-flex items-center justify-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white cursor-pointer border-none outline-none disabled:opacity-50"
                  >
                    {loading ? 'Verifying Gov Records...' : 'Verify Identity & Log Check-In'}
                  </button>
                </form>
              )}

              {/* COUPLE FORM */}
              {verifyType === 'couple' && (
                <form onSubmit={handleVerificationSubmit} className="space-y-6 bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] bg-transparent border-none p-0 cursor-pointer" onClick={resetVerificationForm}>&larr; Back</button>
                    <span className="text-xs text-[#E2E8F0]">|</span>
                    <span className="text-xs font-bold text-[#18385B]">Couple Verification Form</span>
                  </div>

                  {/* Guest 1 */}
                  <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC] space-y-4">
                    <label className="block text-xs font-bold text-[#0F172A]">Primary Guest Details</label>
                    <div className="flex gap-2 flex-wrap">
                      {['aadhaar', 'pan', 'licence'].map(t => (
                        <button 
                          key={t} 
                          type="button" 
                          className={`capitalize px-3 py-1 rounded-lg font-bold text-[10px] border-none cursor-pointer ${coupleId1Type === t ? 'bg-[#18385B] text-white' : 'bg-[#F1F5F9] text-[#475569]'}`} 
                          onClick={() => setCoupleId1Type(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <IdCard size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={coupleId1Number} 
                        onChange={(e) => setCoupleId1Number(e.target.value)} 
                        placeholder="Primary guest ID number"
                        required 
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] outline-none"
                      />
                    </div>
                  </div>

                  {/* Guest 2 */}
                  <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC] space-y-4">
                    <label className="block text-xs font-bold text-[#0F172A]">Second Guest Details</label>
                    <div className="flex gap-2 flex-wrap">
                      {['aadhaar', 'pan', 'licence'].map(t => (
                        <button 
                          key={t} 
                          type="button" 
                          className={`capitalize px-3 py-1 rounded-lg font-bold text-[10px] border-none cursor-pointer ${coupleId2Type === t ? 'bg-[#18385B] text-white' : 'bg-[#F1F5F9] text-[#475569]'}`} 
                          onClick={() => setCoupleId2Type(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <IdCard size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={coupleId2Number} 
                        onChange={(e) => setCoupleId2Number(e.target.value)} 
                        placeholder="Second guest ID number"
                        required 
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Purpose of Visit (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <FileText size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={purpose} 
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="e.g. Tourism, Leisure"
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-xs transition-all inline-flex items-center justify-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white cursor-pointer border-none outline-none disabled:opacity-50"
                  >
                    {loading ? 'Verifying Gov Records...' : 'Verify Both Guests & Check In'}
                  </button>
                </form>
              )}

              {/* PROFESSIONAL FORM */}
              {verifyType === 'pro' && (
                <form onSubmit={handleVerificationSubmit} className="space-y-6 bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] bg-transparent border-none p-0 cursor-pointer" onClick={resetVerificationForm}>&larr; Back</button>
                    <span className="text-xs text-[#E2E8F0]">|</span>
                    <span className="text-xs font-bold text-[#18385B]">Corporate Guest Form</span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Select ID Type</label>
                    <div className="flex gap-2 flex-wrap">
                      {['aadhaar', 'pan', 'licence', 'passport'].map(t => (
                        <button 
                          key={t} 
                          type="button" 
                          className={`capitalize px-3 py-1.5 rounded-lg font-bold transition-all text-[11px] border-none cursor-pointer ${
                            proIdType === t ? 'bg-[#18385B] text-white' : 'bg-[#F1F5F9] text-[#475569]'
                          }`} 
                          onClick={() => setProIdType(t)}
                        >
                          {t === 'licence' ? 'Driving License' : t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Gov ID Number</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <IdCard size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={proIdNumber} 
                        onChange={(e) => setProIdNumber(e.target.value)} 
                        placeholder="Enter ID number"
                        required 
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Purpose of Visit (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <FileText size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={purpose} 
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Business Meetings, Corporate Training"
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-xs transition-all inline-flex items-center justify-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white cursor-pointer border-none outline-none disabled:opacity-50"
                  >
                    {loading ? 'Verifying Gov Records...' : 'Verify Guest & Check In'}
                  </button>
                </form>
              )}

              {/* STUDENT FORM */}
              {verifyType === 'student' && (
                <form onSubmit={handleVerificationSubmit} className="space-y-6 bg-white rounded-2xl p-6 border border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] bg-transparent border-none p-0 cursor-pointer" onClick={resetVerificationForm}>&larr; Back</button>
                    <span className="text-xs text-[#E2E8F0]">|</span>
                    <span className="text-xs font-bold text-[#18385B]">Academic Guest Form</span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Select ID Type</label>
                    <div className="flex gap-2 flex-wrap">
                      {['aadhaar', 'student_id', 'licence'].map(t => (
                        <button 
                          key={t} 
                          type="button" 
                          className={`capitalize px-3 py-1.5 rounded-lg font-bold transition-all text-[11px] border-none cursor-pointer ${
                            studentIdType === t ? 'bg-[#18385B] text-white' : 'bg-[#F1F5F9] text-[#475569]'
                          }`} 
                          onClick={() => setStudentIdType(t)}
                        >
                          {t === 'student_id' ? 'Student ID' : t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Student ID Number</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <IdCard size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={studentIdNumber} 
                        onChange={(e) => setStudentIdNumber(e.target.value)} 
                        placeholder="Enter ID number"
                        required 
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Educational Institution</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <School size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={institution} 
                        onChange={(e) => setInstitution(e.target.value)} 
                        placeholder="e.g. Delhi University"
                        required 
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Purpose of Visit (Optional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                        <FileText size={14} />
                      </span>
                      <input 
                        type="text" 
                        value={purpose} 
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Academic Event, College Trip"
                        className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-xs transition-all inline-flex items-center justify-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white cursor-pointer border-none outline-none disabled:opacity-50"
                  >
                    {loading ? 'Verifying Gov Records...' : 'Verify Student & Check In'}
                  </button>
                </form>
              )}

              {/* VERIFICATION RESULT PANEL */}
              {verifyType === 'done' && (() => {
                const isOverallVerified = verificationResult?.verified !== false;
                return (
                  <div className="space-y-6 max-w-[500px]">
                    {isOverallVerified ? (
                      <div className="bg-white border border-[#A7F3D0] rounded-2xl p-6 text-center space-y-4 shadow-sm bg-gradient-to-b from-[#ECFDF5] to-white">
                        <div className="w-12 h-12 rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center mx-auto">
                          <ShieldCheck size={26} />
                        </div>
                        <div>
                          <h2 className="text-lg font-black text-[#065F46]">Verification Complete</h2>
                          <p className="text-xs text-[#64748B] mt-1">Guest identity matches official UIDAI Aadhaar registry records.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white border border-[#FECACA] rounded-2xl p-6 text-center space-y-4 shadow-sm bg-gradient-to-b from-[#FEF2F2] to-white">
                        <div className="w-12 h-12 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto">
                          <AlertCircle size={26} />
                        </div>
                        <div>
                          <h2 className="text-lg font-black text-[#991B1B]">Verification Failed</h2>
                          <p className="text-xs text-[#64748B] mt-1">Invalid ID / No record found in GovIdRecord.</p>
                        </div>
                      </div>
                    )}

                    <h3 className="text-xs font-black text-[#64748B] uppercase tracking-wider">
                      {isOverallVerified ? 'Verified Guest Dossier' : 'Failed Guest Dossier'}
                    </h3>

                    <div className="space-y-4">
                      {(verificationResult?.persons || []).map((person: any, idx: number) => {
                        const displayName = getGuestDetailName(person, idx);
                        const displayAge = getGuestDetailAge(person, idx);
                        const displayAddress = getGuestDetailAddress(person, idx);

                        return (
                          <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                            <div className="flex justify-between items-center">
                              <h4 className="text-base font-bold text-[#0F172A]">{displayName}</h4>
                              {person.verified ? (
                                <span className="inline-flex items-center gap-1 bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded-full text-[9px] font-black uppercase">🛡 Verified</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-[#FEE2E2] text-[#991B1B] px-2 py-0.5 rounded-full text-[9px] font-black uppercase">❌ Unverified</span>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-xs font-medium text-[#475569]">
                              <div>
                                <span className="text-[10px] text-[#94A3B8] font-black block mb-0.5 uppercase">ID Details</span>
                                <span className="text-[#0F172A] uppercase">{person.idType} : {person.idNumber}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#94A3B8] font-black block mb-0.5 uppercase">Age</span>
                                <span className="text-[#0F172A]">{person.verified && displayAge !== 'N/A' ? `${displayAge} years` : 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#94A3B8] font-black block mb-0.5 uppercase">Gender</span>
                                <span className="text-[#0F172A]">{person.verified ? (person.response?.details?.gender || 'N/A') : 'N/A'}</span>
                              </div>
                            </div>

                            <div className="flex gap-2 text-xs text-[#64748B] bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] items-start">
                              <MapPin size={14} className="shrink-0 mt-0.5 text-[#94A3B8]" />
                              <span>{displayAddress}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-3">
                      <button 
                        className="py-2.5 rounded-xl font-bold text-xs transition-colors bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] flex-1 justify-center cursor-pointer outline-none" 
                        onClick={resetVerificationForm}
                      >
                        &larr; Back
                      </button>
                      <button 
                        className="py-2.5 rounded-xl font-bold text-xs transition-all bg-[#18385B] hover:bg-[#0F243A] text-white flex-[2] justify-center border-none outline-none cursor-pointer" 
                        onClick={resetVerificationForm}
                      >
                        + New Guest Check-In
                      </button>
                    </div>
                  </div>
                );
              })()}

            </div>
          )}

          {/* TAB: HISTORY REGISTRY */}
          {managerTab === 'history' && (
            <div className="space-y-6 max-w-[700px]">
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-[#64748B] font-black tracking-wider uppercase">Total Logs</span>
                  <strong className="text-xl font-black text-[#18385B] block mt-1">{managerVerifications.length}</strong>
                </div>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-[#64748B] font-black tracking-wider uppercase">Verified</span>
                  <strong className="text-xl font-black text-[#059669] block mt-1">
                    {managerVerifications.filter(v => v.persons?.every((p: any) => p.verified !== false)).length}
                  </strong>
                </div>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-[#64748B] font-black tracking-wider uppercase">Failed</span>
                  <strong className="text-xl font-black text-[#EF4444] block mt-1">
                    {managerVerifications.filter(v => v.persons?.some((p: any) => p.verified === false)).length}
                  </strong>
                </div>
              </div>

              {managerVerifications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-[#E2E8F0] flex flex-col items-center">
                  <div className="bg-[#F1F5F9] text-[#64748B] w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A] mb-1">No check-ins registered</h4>
                  <p className="text-xs text-[#64748B]">All frontend front-desk logs will show up here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {managerVerifications.map((v) => {
                    const guestName = getGuestDetailName(v.persons?.[0], 0);
                    const isVerified = v.persons?.every((p: any) => p.verified !== false);

                    return (
                      <div 
                        key={v.id} 
                        onClick={() => isVerified && setSelectedHistoryItem(v)} 
                        className={`flex items-center gap-4 p-4 bg-white border border-[#E2E8F0] rounded-2xl transition-all ${
                          isVerified ? 'cursor-pointer hover:border-[#18385B] hover:shadow-md' : 'cursor-default opacity-85'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
                          {v.type === 'FAMILY' ? (
                            <Users size={18} />
                          ) : v.type === 'COUPLE' ? (
                            <Heart size={18} />
                          ) : v.type === 'STUDENT' ? (
                            <GraduationCap size={18} />
                          ) : (
                            <Briefcase size={18} />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <strong className="text-sm text-[#0F172A]">
                              {v.type === 'COUPLE' && v.persons?.length >= 2
                                ? `${getGuestDetailName(v.persons[0], 0)} & ${getGuestDetailName(v.persons[1], 1)}`
                                : v.type === 'FAMILY'
                                  ? `${guestName} Family`
                                  : guestName}
                            </strong>
                            <span className="bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-full text-[9px] font-bold border border-[#E2E8F0] uppercase">
                              {v.type}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#64748B] mt-0.5 block">
                            {v.type === 'FAMILY' ? `${v.adults} Adults, ${v.children} Children` : 'Checked In'} · {new Date(v.createdAt).toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                          </span>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          isVerified ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEE2E2] text-[#991B1B]'
                        }`}>
                          {isVerified ? 'Verified' : 'Failed'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* History Detail Modal */}
              {selectedHistoryItem && (
                <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-5 backdrop-blur-sm">
                  <div className="bg-white rounded-2xl p-8 max-w-[480px] w-full max-h-[85vh] flex flex-col shadow-lg border border-[#E2E8F0]">
                    <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#E2E8F0]">
                      <h3 className="text-lg font-black text-[#0F172A]">Verification Dossier Details</h3>
                      <button 
                        onClick={() => setSelectedHistoryItem(null)} 
                        className="border-none bg-transparent cursor-pointer text-[#94A3B8] hover:text-[#0F172A]"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                      {(selectedHistoryItem.persons || []).map((person: any, idx: number) => (
                        <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 space-y-3">
                          <div className="flex justify-between items-center">
                            <strong className="text-sm text-[#0F172A]">{getGuestDetailName(person, idx)}</strong>
                            <span className="bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded-full text-[9px] font-black uppercase">🛡 Verified</span>
                          </div>
                          
                          <div className="grid grid-cols-[2fr_1fr] gap-3 text-xs font-medium text-[#475569]">
                            <div>
                              <span className="text-[10px] text-[#94A3B8] font-black block uppercase">ID details</span>
                              <span className="text-[#0F172A] uppercase">{person.idType} : {person.idNumber}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#94A3B8] font-black block uppercase">Age</span>
                              <span className="text-[#0F172A]">{getGuestDetailAge(person, idx)} yrs</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 text-xs text-[#64748B] bg-white border border-[#E2E8F0] p-2.5 rounded-xl items-start">
                            <MapPin size={13} className="shrink-0 mt-0.5 text-[#94A3B8]" />
                            <span>{getGuestDetailAddress(person, idx)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="py-2.5 rounded-xl font-bold text-xs transition-colors bg-[#18385B] hover:bg-[#0F243A] text-white w-full mt-6 border-none cursor-pointer outline-none" 
                      onClick={() => setSelectedHistoryItem(null)}
                    >
                      Close Dossier
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB: HOTEL INFORMATION */}
          {managerTab === 'details' && (
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)] max-w-[600px] space-y-6">
              <h3 className="text-lg font-black text-[#0F172A]">Property Profile Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#64748B] font-black block mb-1 uppercase tracking-wider">Assigned Hotel Name</span>
                  <strong className="text-sm font-bold text-[#0F172A]">{profile?.hotel?.name || 'Assigned Hotel'}</strong>
                </div>
                <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#64748B] font-black block mb-1 uppercase tracking-wider">Full Street Address</span>
                  <strong className="text-sm font-bold text-[#0F172A]">{profile?.hotel?.address || 'Address information'}</strong>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC]">
                    <span className="text-[10px] text-[#64748B] font-black block mb-1 uppercase tracking-wider">City & State</span>
                    <strong className="text-sm font-bold text-[#0F172A]">{profile?.hotel?.city || 'N/A'}{profile?.hotel?.state ? `, ${profile.hotel.state}` : ''}</strong>
                  </div>
                  <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC]">
                    <span className="text-[10px] text-[#64748B] font-black block mb-1 uppercase tracking-wider">Pincode / postal</span>
                    <strong className="text-sm font-bold text-[#0F172A]">{profile?.hotel?.pincode || 'N/A'}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRO PLAN SUBSCRIPTION */}
          {managerTab === 'subscription' && (
            <div className="max-w-[600px] space-y-6">
              
              <div className="bg-[#18385B] rounded-2xl p-6 text-white text-center flex flex-col justify-center items-center shadow-sm">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-4">✦ PRO PLAN ACTIVE</div>
                <div className="text-3xl font-black flex items-center gap-1 leading-none"><span className="text-xl">₹</span>27,000</div>
                <div className="text-white/70 text-xs mt-2">per year · billed annually</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="text-base font-black text-[#0F172A] mb-2">Subscription & Support Status</h3>
                
                {profile?.hotel?.subscriptions?.[0] ? (
                  <div className="divide-y divide-[#F1F5F9] text-xs font-medium text-[#475569]">
                    <div className="flex justify-between py-3">
                      <span>Activation Date</span>
                      <strong className="text-[#0F172A]">{new Date(profile.hotel.subscriptions[0].startDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                    </div>
                    <div className="flex justify-between py-3">
                      <span>Expiry Date</span>
                      <strong className="text-[#0F172A]">{new Date(profile.hotel.subscriptions[0].endDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                    </div>
                    <div className="flex justify-between py-3">
                      <span>Time Remaining</span>
                      {(() => {
                        const end = new Date(profile.hotel.subscriptions[0].endDate);
                        const now = new Date();
                        end.setHours(0, 0, 0, 0);
                        now.setHours(0, 0, 0, 0);
                        const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                        
                        let color = 'text-[#065F46] bg-[#D1FAE5]';
                        let text = `${diffDays} Days`;
                        if (diffDays <= 0) {
                          color = 'text-[#991B1B] bg-[#FEE2E2]';
                          text = 'Expired';
                        } else if (diffDays <= 30) {
                          color = 'text-[#92400E] bg-[#FEF3C7]';
                          text = `${diffDays} Days (Renew Soon)`;
                        }
                        return <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${color}`}>{text}</span>;
                      })()}
                    </div>
                    <div className="flex justify-between py-3">
                      <span>Priority Support</span>
                      <strong className="text-[#065F46] uppercase text-[10px] font-black">✓ 24/7 Priority Support Active</strong>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#64748B]">This hotel has no registered active subscription.</p>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
