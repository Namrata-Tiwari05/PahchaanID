import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

/**
 * Global App Shell Component.
 * NOTE: All main screen routing and portal navigation (Landing, Sign In, Dashboards) 
 * are handled dynamically inside `src/pages/index.tsx` using the custom hook 
 * `useNavigation.ts` (located in `src/hooks/useNavigation.ts`).
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Pahchaan ID — Smart Hotel Guest Verification</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Secure, real-time government ID verification for hotels. Simplify front-desk check-ins with secure biometric and Aadhaar lookup." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
        className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-purple via-brand to-orange-500 z-[9999] transition-all duration-500 ease-out ${
          loading ? 'w-4/5 opacity-100' : 'w-full opacity-0'
        }`}
      />

      <main className="min-h-screen bg-white selection:bg-brand/10 selection:text-brand">
        <Component {...pageProps} />
      </main>
    </>
  );
}
