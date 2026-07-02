import React from 'react';
import { ShieldCheck, FileText, Users, Download } from 'lucide-react';

export const LandingFeatures: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto pt-20 px-8 pb-0" id="platform">
      <div className="mb-12 text-center">
        <div className="bg-transparent text-[#64748B] p-0 font-bold text-xs tracking-wider uppercase mb-4 inline-flex items-center gap-1.5">— WHAT'S INSIDE THE REGISTER</div>
        <h2 className="text-[40px] font-black text-[#0F172A] mt-2 mb-4">Four tabs. One record.</h2>
        <p className="text-[16px] text-[#475569] max-w-[600px] leading-[1.6] mx-auto">Everything a front desk used to keep in three different notebooks, now filed in one place — and readable by anyone who's allowed to open it.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative overflow-hidden p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#18385B] hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#F1F5F9] text-[#18385B]">
            <ShieldCheck size={22} />
          </div>
          <span className="text-[10px] font-extrabold text-[#18385B] tracking-[0.5px] uppercase block mb-2">Tab A — Verification</span>
          <h4 className="text-[18px] font-extrabold text-[#0F172A] mb-3">Checked, not just collected</h4>
          <p className="text-[13.5px] text-[#475569] leading-[1.6]">Aadhaar, PAN, passport or driving licence — matched against the issuing record the moment it's scanned, before the guest reaches the lift.</p>
        </div>

        <div className="relative overflow-hidden p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#18385B] hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#F1F5F9] text-[#18385B]">
            <FileText size={22} />
          </div>
          <span className="text-[10px] font-extrabold text-[#18385B] tracking-[0.5px] uppercase block mb-2">Tab B — Compliance</span>
          <h4 className="text-[18px] font-extrabold text-[#0F172A] mb-3">Filed the way it's asked for</h4>
          <p className="text-[13.5px] text-[#475569] leading-[1.6]">Every stay logged in the format your local station already expects — no separate register, no late submissions to chase.</p>
        </div>

        <div className="relative overflow-hidden p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#18385B] hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#F1F5F9] text-[#18385B]">
            <Users size={22} />
          </div>
          <span className="text-[10px] font-extrabold text-[#18385B] tracking-[0.5px] uppercase block mb-2">Tab C — Roles</span>
          <h4 className="text-[18px] font-extrabold text-[#0F172A] mb-3">Sees only what the job needs</h4>
          <p className="text-[13.5px] text-[#475569] leading-[1.6]">Owners see every property they hold. Managers see their own front desk. Nobody opens a page they shouldn't.</p>
        </div>

        <div className="relative overflow-hidden p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#18385B] hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#F1F5F9] text-[#18385B]">
            <Download size={22} />
          </div>
          <span className="text-[10px] font-extrabold text-[#18385B] tracking-[0.5px] uppercase block mb-2">Tab D — Records</span>
          <h4 className="text-[18px] font-extrabold text-[#0F172A] mb-3">Any night, any guest, exported</h4>
          <p className="text-[13.5px] text-[#475569] leading-[1.6]">Pull any night's register or any guest's full stay history in the format your inspector actually opens — no conversion required.</p>
        </div>
      </div>
    </div>
  );
};
