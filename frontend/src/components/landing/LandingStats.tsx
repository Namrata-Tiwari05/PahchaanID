import React from 'react';
import { Building, Users, Globe, Activity } from 'lucide-react';

export const LandingStats: React.FC = () => {
  return (
    <div className="w-full bg-[#F8FAFC] py-12 px-8 border-t border-b border-[#E2E8F0] shadow-[0_-4px_20px_rgba(0,0,0,0.01)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
        
        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
            <Building size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0F172A] leading-none">2,500+</h3>
            <p className="text-xs font-semibold text-[#64748B] mt-1.5">Hotels Registered</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0F172A] leading-none">1,20,000+</h3>
            <p className="text-xs font-semibold text-[#64748B] mt-1.5">Guests Verified</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
            <Globe size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0F172A] leading-none">25+</h3>
            <p className="text-xs font-semibold text-[#64748B] mt-1.5">States Covered</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#18385B] flex items-center justify-center shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0F172A] leading-none">99.9%</h3>
            <p className="text-xs font-semibold text-[#64748B] mt-1.5">Uptime & Reliability</p>
          </div>
        </div>

      </div>
    </div>
  );
};
