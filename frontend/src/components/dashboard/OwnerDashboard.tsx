import React from 'react';
import { Home as HomeIcon, Hotel, LogOut, Users, Star, AlertCircle, MapPin, User, ChevronRight, X, Phone } from 'lucide-react';

interface OwnerDashboardProps {
  goTo: (target: any) => void;
  logout: () => void;
  profile: any;
  error: string;
  setError: (err: string) => void;
  hotels: any[];
  loadProfileForRole: (role: any) => void;
  setRegStep: (step: number) => void;
  setSelectedHotel: (hotel: any) => void;
  setShowAddManagerModal: (show: boolean) => void;
  handleOpenHotelDetails: (hotel: any) => void;
  showAddManagerModal: boolean;
  newManagerName: string;
  setNewManagerName: (name: string) => void;
  newManagerPhone: string;
  setNewManagerPhone: (phone: string) => void;
  handleAddManager: (e: React.FormEvent) => void;
  loading: boolean;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  goTo,
  logout,
  profile,
  error,
  setError,
  hotels,
  loadProfileForRole,
  setRegStep,
  setSelectedHotel,
  setShowAddManagerModal,
  handleOpenHotelDetails,
  showAddManagerModal,
  newManagerName,
  setNewManagerName,
  newManagerPhone,
  setNewManagerPhone,
  handleAddManager,
  loading,
}) => {
  return (
    <div id="screen-owner-dashboard" className="block min-h-screen animate-screenEnter bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* Header bar */}
      <nav className="bg-white border-b border-[#E2E8F0] px-8 h-16 flex items-center justify-between sticky top-0 z-[100] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <a onClick={() => loadProfileForRole('owner')} className="cursor-pointer inline-flex items-center h-9 bg-white px-3 py-1 rounded-xl transition-transform hover:scale-[1.02]">
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
      
      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[calc(100vh-64px)]">
        
        {/* Left Sidebar */}
        <div className="bg-white border-r border-[#E2E8F0] p-6 space-y-6">
          <div>
            <div className="text-[10px] font-black text-[#94A3B8] tracking-wider uppercase mb-3">Owner Console</div>
            <div className="flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-bold bg-[#18385B]/5 text-[#18385B] cursor-pointer">
              <HomeIcon size={16} />
              Portfolio Overview
            </div>
            <div className="flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors mt-1 cursor-pointer" onClick={() => { if (hotels.length > 0) handleOpenHotelDetails(hotels[0]); }}>
              <Hotel size={16} />
              My Hotels
            </div>
          </div>
          
          <div className="border-t border-[#F1F5F9] pt-6">
            <div className="text-[10px] font-black text-[#94A3B8] tracking-wider uppercase mb-3">System</div>
            <div className="flex items-center gap-3 py-2 px-3 rounded-xl text-sm font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer" onClick={logout}>
              <LogOut size={16} />
              Sign Out
            </div>
          </div>
        </div>

        {/* Right Dashboard Area */}
        <div className="p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <p className="text-xs font-semibold text-[#64748B]">Welcome back, {profile?.name || 'Owner'}</p>
              <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mt-1">Property Portfolio</h1>
            </div>
            <button 
              className="px-5 py-3 rounded-xl font-bold text-xs transition-all inline-flex items-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white shadow-md hover:-translate-y-0.5 active:translate-y-0 border-none outline-none cursor-pointer" 
              onClick={() => { setRegStep(2); goTo('register'); }}
            >
              + Register New Property
            </button>
          </div>

          {error && (
            <div className="bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" /> {error}
            </div>
          )}

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
                <Hotel size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0F172A] leading-none">{hotels.length}</h3>
                <p className="text-xs font-medium text-[#64748B] mt-1.5">Properties Registered</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0F172A] leading-none">
                  {hotels.reduce((acc, h) => acc + (h.managers?.length || 0), 0)}
                </h3>
                <p className="text-xs font-medium text-[#64748B] mt-1.5">Active Staff Managers</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
                <Star size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#18385B] leading-none font-sans">Pro Plan</h3>
                <p className="text-xs font-medium text-[#64748B] mt-1.5">Subscription Status</p>
              </div>
            </div>
          </div>

          {/* Properties List Block */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <h3 className="text-lg font-black text-[#0F172A] mb-5">Registered Properties</h3>

            {hotels.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex items-center justify-center mb-4 text-[#94A3B8]">
                  <Hotel size={40} />
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1">No registered properties</h4>
                <p className="text-xs text-[#64748B]">Click the button above to add your first hotel.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="border border-[#E2E8F0] hover:border-[#18385B] rounded-2xl p-5 bg-white flex flex-col justify-between gap-4 transition-all hover:shadow-md">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
                            <Hotel size={18} />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-[#0F172A]">{hotel.name}</h4>
                            <span className="inline-flex items-center gap-1 bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 border border-[#E2E8F0]">
                              <Users size={10} /> {hotel.managers?.length || 0} Managers
                            </span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          hotel.status === 'ACTIVE' 
                            ? 'bg-[#D1FAE5] text-[#065F46]' 
                            : 'bg-[#FEF3C7] text-[#92400E]'
                        }`}>
                          {hotel.status === 'ACTIVE' ? 'Active' : 'Pending Plan'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-[#64748B] flex items-start gap-1 leading-relaxed">
                        <MapPin size={12} className="shrink-0 mt-0.5 text-[#94A3B8]" />
                        <span>{hotel.address}{hotel.city ? `, ${hotel.city}` : ''}{hotel.state ? `, ${hotel.state}` : ''} - {hotel.pincode}</span>
                      </p>
                    </div>

                    <div className="border-t border-[#F1F5F9] pt-4 flex justify-between items-center">
                      <button 
                        className="px-3 py-2 rounded-lg font-bold text-xs transition-colors bg-transparent text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] border-none outline-none cursor-pointer flex items-center gap-1"
                        onClick={() => { setSelectedHotel(hotel); setShowAddManagerModal(true); }}
                      >
                        <User size={13} /> Add Manager
                      </button>
                      <button 
                        className="px-3.5 py-2 rounded-lg font-bold text-xs transition-all inline-flex items-center gap-1 bg-[#18385B] hover:bg-[#0F243A] text-white cursor-pointer border-none outline-none"
                        onClick={() => handleOpenHotelDetails(hotel)}
                      >
                        View Details <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
