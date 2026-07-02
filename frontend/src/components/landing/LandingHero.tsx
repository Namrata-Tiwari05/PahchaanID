import React from 'react';
import { Shield, Lock, Users, Headphones, ChevronRight } from 'lucide-react';

interface LandingHeroProps {
  goTo: (target: any) => void;
  handleScrollTo: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  goTo,
  handleScrollTo,
}) => {
  return (
    <div className="py-20 px-8 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
      
      {/* Left Column: Headline and Badges */}
      <div className="flex flex-col animate-fadeInUp">
        <div className="inline-flex items-center gap-2 bg-[#18385B]/5 text-[#18385B] px-3.5 py-1.5 rounded-full text-xs font-bold w-fit mb-6">
          Trusted by Hotels. Secured by Technology.
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-[#0F172A] mb-5">
          Secure. Verify.<br />
          Simplify <span className="text-[#18385B]">Hotel Operations.</span>
        </h1>
        
        <p className="text-base md:text-lg text-[#475569] leading-relaxed mb-8 max-w-[540px]">
          Pahchaan ID is a government-compliant guest verification platform that helps hotels ensure security, reduce fraud, and maintain seamless operations.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            className="px-6 py-3.5 rounded-xl font-bold text-sm transition-all bg-[#18385B] hover:bg-[#0F243A] text-white shadow-md hover:-translate-y-0.5 active:translate-y-0 border-none outline-none cursor-pointer" 
            onClick={() => goTo('portal-choice')}
          >
            Register Your Hotel
          </button>
          <button 
            className="px-6 py-3.5 rounded-xl font-bold text-sm transition-all bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#18385B] hover:text-[#18385B] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer outline-none flex items-center gap-1.5" 
            onClick={(e) => handleScrollTo(e, 'platform')}
          >
            Explore Features <ChevronRight size={16} />
          </button>
        </div>
        
        {/* Subtle badges grid */}
        <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#475569] max-w-[480px]">
          <span className="flex items-center gap-2">
            <Shield size={16} className="text-[#18385B]" /> Government Compliant
          </span>
          <span className="flex items-center gap-2">
            <Lock size={16} className="text-[#18385B]" /> Secure & Encrypted
          </span>
          <span className="flex items-center gap-2">
            <Users size={16} className="text-[#18385B]" /> Trusted by Hotels
          </span>
          <span className="flex items-center gap-2">
            <Headphones size={16} className="text-[#18385B]" /> 24/7 Support
          </span>
        </div>
      </div>

      {/* Right Column: Floating Logo with complimenting hover effect */}
      <div className="h-auto flex justify-center items-center relative">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(24,56,91,0.06)_0%,rgba(24,56,91,0)_70%)] blur-[40px] z-0 pointer-events-none"></div>
        
        <div className="group relative z-10 w-full max-w-[340px] aspect-square bg-white border border-[#E2E8F0] rounded-[32px] shadow-[0_20px_40px_rgba(15,23,42,0.03)] flex justify-center items-center p-12 transition-all duration-500 hover:scale-[1.05] hover:rotate-3 hover:shadow-[0_30px_60px_rgba(24,56,91,0.12)] hover:border-[#18385B]/30 cursor-pointer animate-floatLogo">
          <img 
            src="/logo.png" 
            alt="Pahchaan ID Logo" 
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(24,56,91,0.04)]"
          />
        </div>
      </div>

    </div>
  );
};
