import React from 'react';

export const LandingHowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      label: 'Arrival',
      title: 'Guest hands over an ID',
      desc: "Aadhaar, PAN, passport, driving licence or a student ID — whatever they're carrying is enough to start."
    },
    {
      num: '02',
      label: 'Capture',
      title: 'The number is scanned or typed in',
      desc: 'No photocopier, no scanner queue — just the number, entered once at the desk.'
    },
    {
      num: '03',
      label: 'Verification',
      title: "It's checked against the record, live",
      desc: 'A match comes back in seconds. A mismatch is flagged before the room key is handed over.'
    },
    {
      num: '04',
      label: 'Filing',
      title: 'The stay is stamped and on the books',
      desc: 'Logged, dated, and ready to export the moment anyone asks to see it.'
    }
  ];

  return (
    <div className="max-w-[1200px] mt-20 mx-auto px-8" id="how-it-works">
      <div className="mb-12 text-center">
        <div className="bg-transparent text-[#64748B] p-0 font-bold text-xs tracking-wider uppercase mb-4 inline-flex items-center gap-1.5">— HOW A CHECK-IN BECOMES A RECORD</div>
        <h2 className="text-[40px] font-black text-[#0F172A] mt-2 mb-4">Four entries. About eight seconds.</h2>
        <p className="text-[16px] text-[#475569] max-w-[600px] leading-[1.6] mx-auto">The same sequence your front desk has always followed — just without the carbon paper.</p>
      </div>

      <div className="flex flex-col gap-0 max-w-[800px] my-10 mx-auto border-l-2 border-[#E2E8F0] pl-10 relative">
        {steps.map((step, idx) => {
          return (
            <div
              key={idx}
              className="group grid grid-cols-[160px_1fr] gap-8 relative py-8 border-b border-[#E2E8F0] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-3 hover:bg-[#F8FAFC] last:border-b-0 cursor-default"
            >
              {/* Timeline Indicator Circle */}
              <div className="absolute -left-[51px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-[#E2E8F0] transition-all duration-300 z-10 group-hover:border-[#18385B] group-hover:bg-[#18385B] group-hover:scale-125" />

              <div className="flex flex-col justify-center">
                <span className="text-[36px] font-black leading-none text-[#64748B] group-hover:text-[#18385B] transition-colors duration-300">{step.num}</span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider mt-1.5 text-[#64748B] group-hover:text-[#0F172A] transition-colors duration-300">{step.label}</span>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-[19px] font-black mb-1.5 text-[#0F172A] group-hover:text-[#18385B] transition-colors duration-300">{step.title}</h4>
                <p className="text-[14.5px] text-[#64748B] leading-[1.6] m-0">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
