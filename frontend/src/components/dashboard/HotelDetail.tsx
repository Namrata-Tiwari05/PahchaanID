import React from 'react';
import { Hotel, Users, BarChart3, Star, Home as HomeIcon, ChevronLeft, AlertCircle, MapPin, X, User, Phone } from 'lucide-react';
import { getGuestDetailName } from '../constants';

interface HotelDetailProps {
  goTo: (target: any) => void;
  loadProfileForRole: (role: any) => void;
  logout: () => void;
  profile: any;
  hotelDetailTab: 'details' | 'managers' | 'logs' | 'subscription';
  setHotelDetailTab: (tab: 'details' | 'managers' | 'logs' | 'subscription') => void;
  selectedHotel: any;
  error: string;
  setError: (err: string) => void;
  showAddManagerModal: boolean;
  setShowAddManagerModal: (show: boolean) => void;
  newManagerName: string;
  setNewManagerName: (name: string) => void;
  newManagerPhone: string;
  setNewManagerPhone: (phone: string) => void;
  handleAddManager: (e: React.FormEvent) => void;
  handleRemoveManager: (managerId: string) => void;
  detailVerifications: any[];
  loading: boolean;
  role?: 'owner' | 'manager' | 'admin' | 'superadmin' | null;
}

export const HotelDetail: React.FC<HotelDetailProps> = ({
  goTo,
  loadProfileForRole,
  logout,
  profile,
  hotelDetailTab,
  setHotelDetailTab,
  selectedHotel,
  error,
  setError,
  showAddManagerModal,
  setShowAddManagerModal,
  newManagerName,
  setNewManagerName,
  newManagerPhone,
  setNewManagerPhone,
  handleAddManager,
  handleRemoveManager,
  detailVerifications,
  loading,
  role,
}) => {
  return (
    <div id="screen-hotel-detail" className="block min-h-screen animate-screenEnter bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-[#E2E8F0] px-8 h-16 flex items-center justify-between sticky top-0 z-[100] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <a onClick={() => loadProfileForRole(role || 'owner')} className="cursor-pointer inline-flex items-center h-9 bg-white px-3 py-1 rounded-xl transition-transform hover:scale-[1.02]">
          <img src="/logo.png" alt="Pahchaan ID" className="h-full w-auto object-contain" />
        </a>
        <div className="flex gap-4 items-center">
          <div className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-3 py-1.5 rounded-xl border border-[#E2E8F0]">
            Owner · {profile?.name || 'Owner'}
          </div>
          <button className="px-4 py-2 rounded-xl font-bold text-xs transition-colors bg-transparent text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] border-none outline-none cursor-pointer" onClick={logout}>
            Sign Out
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[calc(100vh-64px)]">
        
        {/* Sidebar */}
        <div className="bg-white border-r border-[#E2E8F0] p-6 space-y-6">
          <div>
            <div className="text-[10px] font-black text-[#94A3B8] tracking-wider uppercase mb-3">Property Console</div>
            
            <div 
              className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-bold cursor-pointer transition-colors ${
                hotelDetailTab === 'details' ? 'bg-[#18385B]/5 text-[#18385B]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`} 
              onClick={() => setHotelDetailTab('details')}
            >
              <Hotel size={16} />
              Property Profile
            </div>
            
            <div 
              className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-bold cursor-pointer transition-colors mt-1 ${
                hotelDetailTab === 'managers' ? 'bg-[#18385B]/5 text-[#18385B]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`} 
              onClick={() => setHotelDetailTab('managers')}
            >
              <Users size={16} />
              Staff Management
            </div>
            
            <div 
              className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-bold cursor-pointer transition-colors mt-1 ${
                hotelDetailTab === 'logs' ? 'bg-[#18385B]/5 text-[#18385B]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`} 
              onClick={() => setHotelDetailTab('logs')}
            >
              <BarChart3 size={16} />
              Guest Check-in Logs
            </div>
            
            <div 
              className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-bold cursor-pointer transition-colors mt-1 ${
                hotelDetailTab === 'subscription' ? 'bg-[#18385B]/5 text-[#18385B]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`} 
              onClick={() => setHotelDetailTab('subscription')}
            >
              <Star size={16} />
              Billing & Plan
            </div>
          </div>
          
          <div className="border-t border-[#F1F5F9] pt-6">
            <div className="text-[10px] font-black text-[#94A3B8] tracking-wider uppercase mb-3">Navigation</div>
            <div 
              className="flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer" 
              onClick={() => goTo('owner-dashboard')}
            >
              <HomeIcon size={16} />
              Back to Portfolio
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-8 space-y-8">
          
          <div className="flex items-center gap-4">
            <button 
              className="p-2 rounded-xl border border-[#E2E8F0] hover:border-[#18385B] bg-white text-[#475569] hover:text-[#18385B] transition-all cursor-pointer" 
              onClick={() => goTo('owner-dashboard')}
            >
              <ChevronLeft size={16} />
            </button>
            <div>
              <p className="text-xs font-semibold text-[#64748B]">Property Administration</p>
              <h1 className="text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">{selectedHotel?.name}</h1>
            </div>
          </div>

          {error && (
            <div className="bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" /> {error}
            </div>
          )}

          {/* TAB CONTENT: DETAILS */}
          {hotelDetailTab === 'details' && (
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
              <h3 className="text-lg font-black text-[#0F172A]">Property Profile Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#64748B] font-black tracking-wider block mb-1">HOTEL NAME</span>
                  <strong className="text-sm font-bold text-[#0F172A]">{selectedHotel?.name}</strong>
                </div>
                <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#64748B] font-black tracking-wider block mb-1">COMPLIANCY STATUS</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase mt-1 ${
                    selectedHotel?.status === 'ACTIVE' ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEF3C7] text-[#92400E]'
                  }`}>
                    {selectedHotel?.status === 'ACTIVE' ? 'Active' : 'Pending Plan'}
                  </span>
                </div>
                <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC] md:col-span-2">
                  <span className="text-[10px] text-[#64748B] font-black tracking-wider block mb-1">STREET ADDRESS</span>
                  <strong className="text-sm font-bold text-[#0F172A]">{selectedHotel?.address}</strong>
                </div>
                <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#64748B] font-black tracking-wider block mb-1">CITY & STATE</span>
                  <strong className="text-sm font-bold text-[#0F172A]">
                    {selectedHotel?.city || 'N/A'}{selectedHotel?.state ? `, ${selectedHotel.state}` : ''}
                  </strong>
                </div>
                <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#64748B] font-black tracking-wider block mb-1">PINCODE</span>
                  <strong className="text-sm font-bold text-[#0F172A]">{selectedHotel?.pincode || 'N/A'}</strong>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: MANAGERS */}
          {hotelDetailTab === 'managers' && (
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-[#0F172A]">Registered Staff Managers</h3>
                <button 
                  className="px-4 py-2 rounded-xl font-bold text-xs transition-all inline-flex items-center gap-1 bg-[#18385B] hover:bg-[#0F243A] text-white cursor-pointer border-none outline-none" 
                  onClick={() => setShowAddManagerModal(true)}
                >
                  + Add Manager
                </button>
              </div>
              
              {(!selectedHotel?.managers || selectedHotel.managers.length === 0) ? (
                <div className="text-center py-10">
                  <div className="flex items-center justify-center mb-3 text-[#94A3B8]">
                    <Users size={36} />
                  </div>
                  <p className="text-xs text-[#64748B]">No managers assigned to this hotel yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedHotel.managers.map((m: any) => (
                    <div key={m.id} className="flex justify-between items-center border border-[#E2E8F0] rounded-2xl p-4 bg-white hover:border-[#18385B] transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center font-bold text-sm">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <strong className="block text-sm text-[#0F172A]">{m.name}</strong>
                          <span className="text-xs text-[#64748B]">{m.phone}</span>
                        </div>
                      </div>
                      <button 
                        className="px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors bg-red-50 text-[#EF4444] hover:bg-red-100 hover:text-red-700 border-none cursor-pointer outline-none" 
                        onClick={() => handleRemoveManager(m.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: LOGS */}
          {hotelDetailTab === 'logs' && (
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
              <h3 className="text-lg font-black text-[#0F172A]">Verification Logs</h3>

              {detailVerifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex items-center justify-center mb-4 text-[#94A3B8]">
                    <BarChart3 size={36} />
                  </div>
                  <p className="text-xs text-[#64748B]">No guest check-ins have been verified yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2E8F0] text-[10px] font-black text-[#64748B] uppercase tracking-wider">
                        <th className="pb-3 pr-4">Guest Info</th>
                        <th className="pb-3 px-4">Verification Profile</th>
                        <th className="pb-3 px-4">Checked In At</th>
                        <th className="pb-3 pl-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {detailVerifications.map((v: any) => {
                        const guestName = getGuestDetailName(v.persons?.[0], 0);
                        const isVerified = v.persons?.every((p: any) => p.verified !== false);

                        return (
                          <tr key={v.id} className="text-xs hover:bg-[#F8FAFC] transition-colors">
                            <td className="py-4 pr-4">
                              <span className="font-bold text-[#0F172A] block">
                                {v.type === 'COUPLE' && v.persons?.length >= 2
                                  ? `${getGuestDetailName(v.persons[0], 0)} & ${getGuestDetailName(v.persons[1], 1)}`
                                  : v.type === 'FAMILY'
                                    ? `${guestName} Family`
                                    : guestName}
                              </span>
                              <span className="text-[10px] text-[#64748B] mt-0.5 block">
                                {v.type === 'FAMILY' ? `${v.adults} Adults, ${v.children} Children` : 'Single check-in'}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center gap-1 bg-[#F1F5F9] text-[#18385B] px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border border-[#E2E8F0]">
                                {v.type}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-[#475569] font-medium">
                              {new Date(v.createdAt).toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </td>
                            <td className="py-4 pl-4 text-right">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                isVerified ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEE2E2] text-[#991B1B]'
                              }`}>
                                {isVerified ? 'Verified' : 'Failed'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: SUBSCRIPTION */}
          {hotelDetailTab === 'subscription' && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8">
              
              <div className="bg-[#18385B] rounded-2xl p-6 text-white text-center flex flex-col justify-center items-center shadow-sm">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-4">✦ PRO PLAN ACTIVE</div>
                <div className="text-4xl font-black flex items-center gap-1 leading-none"><span className="text-xl">₹</span>27,000</div>
                <div className="text-white/70 text-xs mt-2">per year · billed annually</div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="text-base font-black text-[#0F172A] mb-2">Subscription & Billing Status</h3>
                
                {selectedHotel?.subscriptions?.[0] ? (
                  <div className="divide-y divide-[#F1F5F9] text-xs font-medium text-[#475569]">
                    <div className="flex justify-between py-3">
                      <span>Activation Date</span>
                      <strong className="text-[#0F172A]">{new Date(selectedHotel.subscriptions[0].startDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                    </div>
                    <div className="flex justify-between py-3">
                      <span>Expiry Date</span>
                      <strong className="text-[#0F172A]">{new Date(selectedHotel.subscriptions[0].endDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                    </div>
                    <div className="flex justify-between py-3">
                      <span>Time Remaining</span>
                      {(() => {
                        const end = new Date(selectedHotel.subscriptions[0].endDate);
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
                      <span>Payment Method</span>
                      <strong className="text-[#065F46] uppercase text-[10px] font-black">✓ Razorpay Gateway (Bypassed)</strong>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#64748B]">No active plan found. Please subscribe to go live.</p>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Add Manager Modal */}
      {showAddManagerModal && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-5 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-[400px] w-full shadow-lg border border-[#E2E8F0]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-[#0F172A]">Add Manager</h3>
              <button 
                onClick={() => { setShowAddManagerModal(false); setError(''); }} 
                className="border-none bg-transparent cursor-pointer text-[#94A3B8] hover:text-[#0F172A]"
              >
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] p-3.5 rounded-xl text-xs font-semibold mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleAddManager} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Manager's Full Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                    <User size={14} />
                  </span>
                  <input 
                    type="text" 
                    value={newManagerName} 
                    onChange={(e) => { setError(''); setNewManagerName(e.target.value); }} 
                    placeholder="e.g. Vikram Singh" 
                    required 
                    className="w-full p-[10px_12px_10px_32px] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-black tracking-wider uppercase text-[#475569]">Manager's Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] flex items-center">
                    <Phone size={14} />
                  </span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 text-xs font-bold text-[#64748B]">+91 </span>
                  <input 
                    type="tel" 
                    value={newManagerPhone} 
                    onChange={(e) => { setError(''); setNewManagerPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); }} 
                    placeholder="XXXXX XXXXX" 
                    required 
                    className="w-full p-[10px_12px_10px_64px] border border-[#E2E8F0] rounded-xl font-bold text-xs text-[#0F172A] bg-white transition-all focus:border-[#18385B] focus:ring-4 focus:ring-[#18385B]/5 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  className="py-2.5 rounded-xl font-bold text-xs transition-colors bg-white border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] flex-1 justify-center cursor-pointer outline-none" 
                  onClick={() => { setShowAddManagerModal(false); setError(''); }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="py-2.5 rounded-xl font-bold text-xs transition-all bg-[#18385B] hover:bg-[#0F243A] text-white flex-1 justify-center border-none outline-none cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Manager'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
