import Head from 'next/head';
import { useEffect } from 'react';
import * as api from '../services/apiService';

// Shared Constants
import { STATES, ALL_DISTRICTS } from '../components/constants';

// Landing Components
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingStats } from '../components/landing/LandingStats';
import { LandingFeatures } from '../components/landing/LandingFeatures';
import { LandingHowItWorks } from '../components/landing/LandingHowItWorks';
import { LandingRoleSelector } from '../components/landing/LandingRoleSelector';
import { LandingFooter } from '../components/landing/LandingFooter';

// Portal & Auth Components
import { PortalChoice } from '../components/auth/AccessPortalChoice';
import { SignInForm } from '../components/auth/SignInForm';
import { RegisterWizard } from '../components/auth/RegisterWizard';

// Dashboard Components
import { OwnerDashboard } from '../components/dashboard/OwnerDashboard';
import { HotelDetail } from '../components/dashboard/HotelDetail';
import { ManagerDashboard } from '../components/dashboard/ManagerDashboard';

// Custom Hooks
import { useNavigation } from '../hooks/useNavigation';
import { useAuth } from '../hooks/useAuth';
import { useRegistration } from '../hooks/useRegistration';
import { useOwnerDashboard } from '../hooks/useOwnerDashboard';
import { useManagerDashboard } from '../hooks/useManagerDashboard';

export default function Home() {
  // 1. Navigation Hook: Coordinates active screen navigation, scrolling, and tab selections
  const {
    screen,
    setScreen,
    managerTab,
    setManagerTab,
    hotelDetailTab,
    setHotelDetailTab,
    goTo,
    handleScrollTo,
  } = useNavigation();

  // 2. Authentication Hook: Handles login steps, OTP sending/verification, and session management
  const {
    token,
    role,
    profile,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
    loginRole,
    setLoginRole,
    loginPhone,
    setLoginPhone,
    loginOtp,
    setLoginOtp,
    loginStep,
    setLoginStep,
    loginOtpHint,
    setLoginOtpHint,
    adminSelectedState,
    setAdminSelectedState,
    adminTypedDistrict,
    setAdminTypedDistrict,
    handleSendOtp,
    handleVerifyOtp,
    logout,
    restoreAuth,
    loadProfileForRole,
  } = useAuth();

  // 3. Registration Hook: Coordinates owner signup steps, state selections, and mock payment gateway
  const {
    regStep,
    setRegStep,
    regPersonal,
    setRegPersonal,
    regOtp,
    setRegOtp,
    regOtpHint,
    setRegOtpHint,
    regHotel,
    setRegHotel,
    regDistricts,
    setRegDistricts,
    districtsLoading,
    setDistrictsLoading,
    createdHotelId,
    setCreatedHotelId,
    showPayConfirm,
    setShowPayConfirm,
    handleRegPersonalNext,
    handleRegOtpVerify,
    handleStateChange,
    handleRegHotelNext,
    handleRegPaymentConfirm,
  } = useRegistration();

  // 4. Owner Dashboard Hook: Manages owner's property list, active subscription, and manager staff additions
  const {
    hotels,
    setHotels,
    selectedHotel,
    setSelectedHotel,
    showAddManagerModal,
    setShowAddManagerModal,
    newManagerName,
    setNewManagerName,
    newManagerPhone,
    setNewManagerPhone,
    detailVerifications,
    setDetailVerifications,
    handleOpenHotelDetails,
    handleAddManager,
    handleRemoveManager,
  } = useOwnerDashboard();

  // 5. Manager Dashboard Hook: Drives front desk check-in state, verification results, and history logs
  const {
    verifyType,
    setVerifyType,
    primaryIdType,
    setPrimaryIdType,
    primaryIdNumber,
    setPrimaryIdNumber,
    adults,
    setAdults,
    children,
    setChildren,
    purpose,
    setPurpose,
    coupleId1Type,
    setCoupleId1Type,
    coupleId1Number,
    setCoupleId1Number,
    coupleId2Type,
    setCoupleId2Type,
    coupleId2Number,
    setCoupleId2Number,
    proIdType,
    setProIdType,
    proIdNumber,
    setProIdNumber,
    studentIdType,
    setStudentIdType,
    studentIdNumber,
    setStudentIdNumber,
    institution,
    setInstitution,
    verificationResult,
    setVerificationResult,
    managerVerifications,
    setManagerVerifications,
    selectedHistoryItem,
    setSelectedHistoryItem,
    resetVerificationForm,
    handleVerificationSubmit,
  } = useManagerDashboard();

  // Share profile load callbacks for authentication and registration processes
  const authCallbacks = {
    onSuccess: ({ profile, hotels, managerVerifications }: any) => {
      if (hotels) setHotels(hotels);
      if (managerVerifications) setManagerVerifications(managerVerifications);
    },
    onNavigate: (target: any) => setScreen(target),
  };

  // Restore Auth Token on mount
  useEffect(() => {
    restoreAuth(authCallbacks);
  }, []);

  // Action Wrappers
  const handleLogout = () => {
    logout(() => {
      setHotels([]);
      setSelectedHotel(null);
      setScreen('landing');
    });
  };

  const handleSendOtpWrapper = (e: React.FormEvent) => {
    handleSendOtp(e);
  };

  const handleVerifyOtpWrapper = (e: React.FormEvent) => {
    handleVerifyOtp(e, authCallbacks);
  };

  const handleRegPersonalNextWrapper = (e: React.FormEvent) => {
    handleRegPersonalNext(e, { setLoading, setError });
  };

  const handleRegOtpVerifyWrapper = (e: React.FormEvent) => {
    handleRegOtpVerify(e, { setLoading, setError, setTokenState: () => {}, setRoleState: () => {} });
  };

  const handleRegHotelNextWrapper = (e: React.FormEvent) => {
    handleRegHotelNext(e, { setLoading, setError });
  };

  const handleRegPaymentConfirmWrapper = () => {
    handleRegPaymentConfirm({
      setLoading,
      setError,
      loadProfileForRole: (targetRole) => loadProfileForRole(targetRole, authCallbacks)
    });
  };

  const handleOpenHotelDetailsWrapper = (hotel: any) => {
    handleOpenHotelDetails(hotel, {
      setLoading,
      setError,
      setHotelDetailTab,
      goTo
    });
  };

  const handleAddManagerWrapper = (e: React.FormEvent) => {
    handleAddManager(e, {
      setLoading,
      setError,
      loadProfileForRole: (targetRole) => loadProfileForRole(targetRole, authCallbacks),
      setHotelDetailTab,
      goTo
    });
  };

  const handleRemoveManagerWrapper = (managerId: string) => {
    handleRemoveManager(managerId, {
      setLoading,
      setError
    });
  };

  const handleVerificationSubmitWrapper = (e: React.FormEvent) => {
    handleVerificationSubmit(e, {
      setLoading,
      setError
    });
  };

  return (
    <>
      <Head>
        <title>Pahchaan ID — Smart Hotel Guest Verification</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="fixed rounded-full blur-[120px] opacity-5 -z-10 pointer-events-none w-[500px] h-[500px] bg-[#8B5CF6] -top-[100px] -left-[100px] animate-floatBlob1"></div>
      <div className="fixed rounded-full blur-[120px] opacity-5 -z-10 pointer-events-none w-[600px] h-[600px] bg-[#EC4899] -bottom-[150px] -right-[100px] animate-floatBlob2"></div>
      <div className="fixed rounded-full blur-[120px] opacity-5 -z-10 pointer-events-none w-[400px] h-[400px] bg-[#06B6D4] top-[35%] left-[55%] animate-floatBlob3"></div>

      {/* LANDING SCREEN */}
      {screen === 'landing' && (
        <div id="screen-landing" className="block min-h-screen opacity-100 animate-screenEnter bg-white text-[#1E293B] font-sans">
          <LandingNavbar
            goTo={goTo}
            setLoginStep={setLoginStep}
            setLoginRole={setLoginRole}
            handleScrollTo={handleScrollTo}
          />
          <LandingHero goTo={goTo} handleScrollTo={handleScrollTo} />
          <LandingStats />
          <div className="bg-white text-[#1E293B]">
            <LandingFeatures />
            <LandingHowItWorks />
            <LandingRoleSelector
              goTo={goTo}
              setRegStep={setRegStep}
              setLoginStep={setLoginStep}
              setLoginRole={setLoginRole}
            />
          </div>
          <LandingFooter
            goTo={goTo}
            setLoginRole={setLoginRole}
            setLoginStep={setLoginStep}
            handleScrollTo={handleScrollTo}
          />
        </div>
      )}

      {/* PORTAL CHOICE SCREEN */}
      {screen === 'portal-choice' && (
        <PortalChoice
          goTo={goTo}
          setRegStep={setRegStep}
          setLoginStep={setLoginStep}
          setLoginRole={setLoginRole}
        />
      )}

      {/* SIGN IN SCREEN */}
      {screen === 'signin' && (
        <SignInForm
          goTo={goTo}
          error={error}
          setError={setError}
          loading={loading}
          loginStep={loginStep}
          setLoginStep={setLoginStep}
          loginPhone={loginPhone}
          setLoginPhone={setLoginPhone}
          loginOtp={loginOtp}
          setLoginOtp={setLoginOtp}
          loginRole={loginRole}
          setLoginRole={setLoginRole}
          loginOtpHint={loginOtpHint}
          handleSendOtp={handleSendOtpWrapper}
          handleVerifyOtp={handleVerifyOtpWrapper}
          adminSelectedState={adminSelectedState}
          setAdminSelectedState={setAdminSelectedState}
          adminTypedDistrict={adminTypedDistrict}
          setAdminTypedDistrict={setAdminTypedDistrict}
        />
      )}


      {/* REGISTRATION WIZARD SCREEN */}
      {screen === 'register' && (
        <RegisterWizard
          goTo={goTo}
          error={error}
          setError={setError}
          loading={loading}
          regStep={regStep}
          setRegStep={setRegStep}
          regPersonal={regPersonal}
          setRegPersonal={setRegPersonal}
          regOtp={regOtp}
          setRegOtp={setRegOtp}
          regOtpHint={regOtpHint}
          regHotel={regHotel}
          setRegHotel={setRegHotel}
          regDistricts={regDistricts}
          districtsLoading={districtsLoading}
          showPayConfirm={showPayConfirm}
          setShowPayConfirm={setShowPayConfirm}
          handleRegPersonalNext={handleRegPersonalNextWrapper}
          handleRegOtpVerify={handleRegOtpVerifyWrapper}
          handleRegHotelNext={handleRegHotelNextWrapper}
          handleStateChange={handleStateChange}
          handleRegPaymentConfirm={handleRegPaymentConfirmWrapper}
        />
      )}

      {/* OWNER DASHBOARD SCREEN */}
      {screen === 'owner-dashboard' && (
        <OwnerDashboard
          goTo={goTo}
          logout={handleLogout}
          profile={profile}
          error={error}
          setError={setError}
          hotels={hotels}
          loadProfileForRole={(r) => loadProfileForRole(r, authCallbacks)}
          setRegStep={setRegStep}
          setSelectedHotel={setSelectedHotel}
          setShowAddManagerModal={setShowAddManagerModal}
          handleOpenHotelDetails={handleOpenHotelDetailsWrapper}
          showAddManagerModal={showAddManagerModal}
          newManagerName={newManagerName}
          setNewManagerName={setNewManagerName}
          newManagerPhone={newManagerPhone}
          setNewManagerPhone={setNewManagerPhone}
          handleAddManager={handleAddManagerWrapper}
          loading={loading}
        />
      )}

      {/* HOTEL DETAIL SCREEN */}
      {screen === 'hotel-detail' && (
        <HotelDetail
          goTo={goTo}
          loadProfileForRole={(r) => loadProfileForRole(r, authCallbacks)}
          logout={handleLogout}
          profile={profile}
          hotelDetailTab={hotelDetailTab}
          setHotelDetailTab={setHotelDetailTab}
          selectedHotel={selectedHotel}
          error={error}
          setError={setError}
          showAddManagerModal={showAddManagerModal}
          setShowAddManagerModal={setShowAddManagerModal}
          newManagerName={newManagerName}
          setNewManagerName={setNewManagerName}
          newManagerPhone={newManagerPhone}
          setNewManagerPhone={setNewManagerPhone}
          handleAddManager={handleAddManagerWrapper}
          handleRemoveManager={handleRemoveManagerWrapper}
          detailVerifications={detailVerifications}
          loading={loading}
          role={role}
        />
      )}

      {/* MANAGER DASHBOARD SCREEN */}
      {screen === 'manager-dashboard' && (
        <ManagerDashboard
          logout={handleLogout}
          profile={profile}
          managerTab={managerTab}
          setManagerTab={setManagerTab}
          resetVerificationForm={resetVerificationForm}
          error={error}
          setError={setError}
          verifyType={verifyType}
          setVerifyType={setVerifyType}
          managerVerifications={managerVerifications}
          primaryIdType={primaryIdType}
          setPrimaryIdType={setPrimaryIdType}
          primaryIdNumber={primaryIdNumber}
          setPrimaryIdNumber={setPrimaryIdNumber}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          purpose={purpose}
          setPurpose={setPurpose}
          coupleId1Type={coupleId1Type}
          setCoupleId1Type={setCoupleId1Type}
          coupleId1Number={coupleId1Number}
          setCoupleId1Number={setCoupleId1Number}
          coupleId2Type={coupleId2Type}
          setCoupleId2Type={setCoupleId2Type}
          coupleId2Number={coupleId2Number}
          setCoupleId2Number={setCoupleId2Number}
          proIdType={proIdType}
          setProIdType={setProIdType}
          proIdNumber={proIdNumber}
          setProIdNumber={setProIdNumber}
          studentIdType={studentIdType}
          setStudentIdType={setStudentIdType}
          studentIdNumber={studentIdNumber}
          setStudentIdNumber={setStudentIdNumber}
          institution={institution}
          setInstitution={setInstitution}
          verificationResult={verificationResult}
          selectedHistoryItem={selectedHistoryItem}
          setSelectedHistoryItem={setSelectedHistoryItem}
          handleVerificationSubmit={handleVerificationSubmitWrapper}
          loading={loading}
        />
      )}

    </>
  );
}
