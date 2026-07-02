import React, { useState } from 'react';

export type ScreenType =
  | 'landing'
  | 'portal-choice'
  | 'register'
  | 'signin'
  | 'admin-signin'
  | 'owner-dashboard'
  | 'hotel-detail'
  | 'manager-dashboard'
  | 'admin-dashboard';

export type ManagerTabType = 'verify' | 'history' | 'details' | 'subscription';
export type HotelDetailTabType = 'details' | 'managers' | 'logs' | 'subscription';

export function useNavigation() {
  const [screen, setScreen] = useState<ScreenType>('landing');
  const [managerTab, setManagerTab] = useState<ManagerTabType>('verify');
  const [hotelDetailTab, setHotelDetailTab] = useState<HotelDetailTabType>('details');

  const goTo = (target: ScreenType, resetErrors?: () => void) => {
    if (resetErrors) resetErrors();
    setScreen(target);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    screen,
    setScreen,
    managerTab,
    setManagerTab,
    hotelDetailTab,
    setHotelDetailTab,
    goTo,
    handleScrollTo,
  };
}
