import React from 'react';

interface LandingFooterProps {
  goTo: (target: any) => void;
  setLoginRole: (role: 'manager' | 'owner' | 'admin' | 'superadmin') => void;
  setLoginStep: (step: 'phone' | 'otp') => void;
  handleScrollTo: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  goTo,
  setLoginRole,
  setLoginStep,
  handleScrollTo,
}) => {
  return (
    <div className="bg-[#0E2136] text-[#F8FAFC] pt-20 pb-10 border-t border-[#132C48] mt-20 px-4 md:px-8">
      {/* CTA Banner */}
      <div className="max-w-[1200px] mx-auto mb-20 p-8 md:p-12 bg-white rounded-2xl border border-[#E2E8F0] relative overflow-hidden shadow-sm text-left">
        
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full border border-dashed border-[#18385B]/10 pointer-events-none" />
        <div className="absolute -right-12 -top-12 w-80 h-80 rounded-full border border-dashed border-[#18385B]/5 pointer-events-none" />
 
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4 tracking-tight">Close the books on paper registers.</h2>
          <p className="text-sm text-[#475569] mb-8 max-w-[600px] leading-relaxed">Set up verification at your front desk in under a day. No register book required ever again.</p>
          <div className="flex items-center gap-5 flex-wrap">
            <button 
              className="px-6 py-3.5 rounded-xl font-bold text-xs transition-all duration-300 inline-flex items-center gap-2 bg-[#18385B] hover:bg-[#0F243A] text-white shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-none outline-none" 
              onClick={() => goTo('portal-choice')}
            >
              Get started
            </button>
            <span className="text-[#64748B] text-xs font-semibold">No card needed to see a live demo</span>
          </div>
        </div>
      </div>
 
      {/* Footer Main */}
      <footer className="max-w-[1240px] mx-auto mb-10 p-8 md:p-12 bg-[#091524] rounded-2xl border border-[#132C48] text-white shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-10 border-b border-[#132C48]">
          {/* Logo & Description */}
          <div>
            <a onClick={() => goTo('landing')} className="cursor-pointer inline-flex items-center h-9 mb-4 bg-white px-3 py-1 rounded-lg shadow-sm">
              <img src="/logo.png" alt="Pahchaan ID" className="h-full w-auto object-contain" />
            </a>
            <p className="text-white/70 text-xs leading-relaxed max-w-[280px]">The guest register, digitized — built for hotels checking in guests across India, one entry at a time.</p>
          </div>
 
          {/* Column 1 */}
          <div>
            <h4 className="text-[10px] font-black text-white/50 tracking-wider uppercase mb-4">Product</h4>
            <ul className="list-none p-0 m-0 space-y-2.5">
              {['Verification', 'Compliance', 'Roles'].map(item => (
                <li key={item}>
                  <a
                    href="#platform"
                    onClick={(e) => handleScrollTo(e, 'platform')}
                    className="text-white/80 no-underline text-xs transition-colors duration-200 hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Column 2 */}
          <div>
            <h4 className="text-[10px] font-black text-white/50 tracking-wider uppercase mb-4">Company</h4>
            <ul className="list-none p-0 m-0 space-y-2.5">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 no-underline text-xs transition-colors duration-200 hover:text-white">About</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 no-underline text-xs transition-colors duration-200 hover:text-white">Contact</a></li>
            </ul>
          </div>
 
          {/* Column 3 */}
          <div>
            <h4 className="text-[10px] font-black text-white/50 tracking-wider uppercase mb-4">Legal</h4>
            <ul className="list-none p-0 m-0 space-y-2.5">
              {['Terms', 'Privacy'].map(item => (
                <li key={item}><a href="#" onClick={(e) => e.preventDefault()} className="text-white/80 no-underline text-xs transition-colors duration-200 hover:text-white">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
 
        {/* Bottom Copyright */}
        <div className="flex justify-between items-center pt-6 text-[11px] text-white/50 flex-wrap gap-4">
          <span>© 2026 Pahchaan ID</span>
          <span>Register closes nightly at 23:59 IST - Data encrypted at rest</span>
        </div>
      </footer>
    </div>
  );
};
