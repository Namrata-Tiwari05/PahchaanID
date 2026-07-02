/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
          DEFAULT: 'var(--color-brand-600)',
        },
        purple: {
          DEFAULT: 'var(--color-brand-600)',
          light: 'var(--color-brand-50)',
          mid: 'var(--color-brand-400)',
          dark: 'var(--color-brand-800)',
        },
        orange: {
          DEFAULT: '#F97316',
          light: 'rgba(249, 115, 22, 0.06)',
        },
        pink: {
          DEFAULT: 'var(--color-brand-400)',
          light: 'rgba(24, 56, 91, 0.06)',
        },
        blue: {
          DEFAULT: 'var(--color-brand-600)',
          light: 'var(--color-brand-50)',
        },
        yellow: {
          DEFAULT: '#B45309',
          light: 'rgba(180, 83, 9, 0.06)',
        },
        green: {
          DEFAULT: '#059669',
          light: 'rgba(5, 150, 105, 0.06)',
        },
        bg: '#F8FAFC',
        border: '#E2E8F0',
        text: {
          DEFAULT: '#0F172A',
          muted: '#64748B',
        }
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
      keyframes: {
        screenEnter: {
          'from': { opacity: '0', transform: 'translateY(24px) scale(0.98)', filter: 'blur(8px)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        screenExit: {
          'from': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
          'to': { opacity: '0', transform: 'translateY(-24px) scale(0.98)', filter: 'blur(8px)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGreen: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.5)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 8px rgba(16, 185, 129, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
        },
        successBounce: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        verifiedSlideIn: {
          'from': { opacity: '0', transform: 'translateY(15px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        stepEntrance: {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        scanAnimation: {
          '0%, 100%': { top: '0%', opacity: '0.1' },
          '10%, 90%': { opacity: '0.9' },
          '50%': { top: '100%', opacity: '0.9' },
        },
        strokeCircle: {
          'to': { strokeDashoffset: '0' },
        },
        strokeCheck: {
          'to': { strokeDashoffset: '0' },
        },
        liveFeedSlide: {
          'from': { opacity: '0', transform: 'translateY(-10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        floatBlob1: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(120px, 80px) scale(1.15)' },
        },
        floatBlob2: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(-90px, -120px) scale(1.1)' },
        },
        floatBlob3: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(80px, -80px) scale(0.85)' },
        },
        floatLogo: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        screenEnter: 'screenEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        screenExit: 'screenExit 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeInUp: 'fadeInUp 0.4s ease both',
        pulseGreen: 'pulseGreen 2s infinite',
        successBounce: 'successBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        verifiedSlideIn: 'verifiedSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        stepEntrance: 'stepEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        scanAnimation: 'scanAnimation 3.5s ease-in-out infinite',
        strokeCircle: 'strokeCircle 0.7s cubic-bezier(0.65, 0, 0.45, 1) forwards',
        strokeCheck: 'strokeCheck 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards',
        liveFeedSlide: 'liveFeedSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        floatBlob1: 'floatBlob1 24s infinite alternate ease-in-out',
        floatBlob2: 'floatBlob2 30s infinite alternate ease-in-out',
        floatBlob3: 'floatBlob3 20s infinite alternate ease-in-out',
        floatLogo: 'floatLogo 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
