import React, { useState } from 'react';

interface LandingNavbarProps {
  goTo: (target: any) => void;
  setLoginStep: (step: 'phone' | 'otp') => void;
  setLoginRole: (role: 'manager' | 'owner' | 'admin' | 'superadmin') => void;
  handleScrollTo: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  goTo,
  setLoginStep,
  setLoginRole,
  handleScrollTo,
}) => {
  const [activeLink, setActiveLink] = useState('platform');

  const navLinks = [
    { label: 'Platform', id: 'platform' },
    { label: 'How it works', id: 'how-it-works' },
    { label: 'What\'s inside', id: 'whats-inside' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <nav className="bg-[#0E2136] border-b border-[#132C48] px-8 h-16 flex items-center justify-between sticky top-0 z-[100] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <a onClick={() => { goTo('landing'); setActiveLink('platform'); }} className="cursor-pointer inline-flex items-center h-[42px] bg-white px-3 py-1 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <img src="/logo.png" alt="Pahchaan ID" className="h-full w-auto object-contain" />
      </a>

      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={`#${link.id}`}
            onClick={(e) => {
              handleScrollTo(e, link.id);
              setActiveLink(link.id);
            }}
            className={`text-sm font-semibold py-1.5 transition-colors duration-200 relative ${
              activeLink === link.id ? 'text-white font-bold' : 'text-white/80 hover:text-white'
            }`}
          >
            {link.label}
            {activeLink === link.id && (
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white rounded-full" />
            )}
          </a>
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <button
          className="px-[26px] py-[12px] rounded-[12px] font-medium text-[14.5px] transition-all bg-transparent text-white/90 hover:bg-white/10 hover:text-white border-none outline-none cursor-pointer"
          onClick={() => { setLoginStep('phone'); setLoginRole('manager'); goTo('signin'); }}
        >
          Sign in
        </button>
        <button 
          className="px-[26px] py-[12px] rounded-[12px] font-semibold text-[14.5px] transition-all bg-white text-[#18385B] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#F8FAFC] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-none outline-none" 
          onClick={() => goTo('portal-choice')}
        >
          Get started
        </button>
      </div>
    </nav>
  );
};
