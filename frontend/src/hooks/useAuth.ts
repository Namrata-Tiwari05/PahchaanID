import React, { useState, useEffect } from 'react';
import * as api from '../services/apiService';
import { ScreenType } from './useNavigation';

export type RoleType = 'owner' | 'manager' | 'admin' | 'superadmin' | null;

interface LoadProfileCallbacks {
  onSuccess: (data: {
    profile: any;
    hotels?: any[];
    managerVerifications?: any[];
    adminData?: {
      stats: any;
      recentHotels: any[];
      verifications: any[];
      guestBreakdown: any;
    };
  }) => void;
  onNavigate: (screen: ScreenType) => void;
}

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(null);
  const [role, setRoleState] = useState<RoleType>(null);
  const [profile, setProfile] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login inputs
  const [loginRole, setLoginRole] = useState<'manager' | 'owner' | 'admin' | 'superadmin'>('manager');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [loginStep, setLoginStep] = useState<'phone' | 'otp'>('phone');
  const [loginOtpHint, setLoginOtpHint] = useState('');
  const [adminSelectedState, setAdminSelectedState] = useState('');
  const [adminTypedDistrict, setAdminTypedDistrict] = useState('');

  // Profile Fetcher depending on logged-in role
  const loadProfileForRole = async (targetRole: RoleType, callbacks: LoadProfileCallbacks) => {
    setLoading(true);
    setError('');
    try {
      if (targetRole === 'owner') {
        const res = await api.ownerProfile();
        setProfile(res.owner);
        const mapped = (res.owner.hotels || []).map((h: any) => ({
          id: h.id,
          name: h.name,
          address: h.address,
          city: h.city || '',
          state: h.state || '',
          pincode: h.pincode || '',
          status: h.status,
          managers: h.managers || [],
          subscriptions: h.subscriptions || [],
        }));
        callbacks.onSuccess({ profile: res.owner, hotels: mapped });
        callbacks.onNavigate('owner-dashboard');
      } else if (targetRole === 'manager') {
        const res = await api.managerProfile();
        setProfile(res.manager);
        const verifRes = await api.getManagerVerifications();
        callbacks.onSuccess({
          profile: res.manager,
          managerVerifications: verifRes.verifications || [],
        });
        callbacks.onNavigate('manager-dashboard');
      } else if (targetRole === 'superadmin') {
        const res = await api.superAdminDashboard();
        callbacks.onSuccess({
          profile: null,
          adminData: {
            stats: res.stats,
            recentHotels: res.recentHotels || [],
            verifications: res.verifications || [],
            guestBreakdown: res.guestTypeBreakdown,
          },
        });
        callbacks.onNavigate('admin-dashboard');
      } else if (targetRole === 'admin') {
        const res = await api.adminDashboard();
        callbacks.onSuccess({
          profile: null,
          adminData: {
            stats: null, // calculated in index.tsx based on district filtering
            recentHotels: res.activeHotels || [],
            verifications: res.verifications || [],
            guestBreakdown: null,
          },
        });
        callbacks.onNavigate('admin-dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
      logout(() => {});
    } finally {
      setLoading(false);
    }
  };

  const logout = (onReset: () => void) => {
    api.setToken(null);
    setTokenState(null);
    setRoleState(null);
    setProfile(null);
    onReset();
  };

  // Restore Auth Token on mount
  const restoreAuth = (callbacks: LoadProfileCallbacks) => {
    const savedToken = localStorage.getItem('pehchaan_token');
    const savedRole = localStorage.getItem('pehchaan_role') as any;
    if (savedToken && savedRole) {
      setTokenState(savedToken);
      setRoleState(savedRole);
      api.setToken(savedToken);

      if (savedRole === 'admin') {
        const state = localStorage.getItem('pehchaan_admin_state') || '';
        const dist = localStorage.getItem('pehchaan_admin_district') || '';
        setAdminSelectedState(state);
        setAdminTypedDistrict(dist);
      }

      loadProfileForRole(savedRole, callbacks);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (loginRole === 'admin') {
      if (!adminSelectedState) {
        setError('Please select a state');
        return;
      }
      if (!adminTypedDistrict.trim()) {
        setError('Please enter a district name');
        return;
      }
    }
    setError('');
    setLoading(true);
    try {
      const fullPhone = `+91${loginPhone.trim()}`;
      let res: any;
      if (loginRole === 'owner') {
        res = await api.ownerLogin(fullPhone);
      } else if (loginRole === 'manager') {
        res = await api.managerLogin(fullPhone);
      } else if (loginRole === 'admin') {
        res = await api.adminLogin(fullPhone);
      } else if (loginRole === 'superadmin') {
        res = await api.superAdminLogin(fullPhone);
      }
      setLoginOtpHint(res.otp || '');
      setLoginStep('otp');
    } catch (err: any) {
      setError(err.message || 'Login request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent, callbacks: LoadProfileCallbacks) => {
    e.preventDefault();
    if (loginOtp.length !== 6) {
      setError('OTP must be a 6-digit code');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const fullPhone = `+91${loginPhone.trim()}`;
      let res: any;
      if (loginRole === 'owner') {
        res = await api.ownerVerifyOtp(fullPhone, loginOtp.trim());
      } else if (loginRole === 'manager') {
        res = await api.managerVerifyOtp(fullPhone, loginOtp.trim());
      } else if (loginRole === 'admin') {
        res = await api.adminVerifyOtp(fullPhone, loginOtp.trim());
        localStorage.setItem('pehchaan_admin_state', adminSelectedState);
        localStorage.setItem('pehchaan_admin_district', adminTypedDistrict.trim());
      } else if (loginRole === 'superadmin') {
        res = await api.superAdminVerifyOtp(fullPhone, loginOtp.trim());
      }
      api.setToken(res.token);
      localStorage.setItem('pehchaan_role', loginRole);
      localStorage.setItem('pehchaan_token', res.token);
      setTokenState(res.token);
      setRoleState(loginRole);

      // Clean form inputs
      setLoginPhone('');
      setLoginOtp('');
      setLoginStep('phone');
      setLoginOtpHint('');

      await loadProfileForRole(loginRole, callbacks);
    } catch (err: any) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
