import React, { useState } from 'react';
import * as api from '../services/apiService';
import { ScreenType } from './useNavigation';
import { RoleType } from './useAuth';

interface RegistrationCallbacks {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setTokenState: (token: string | null) => void;
  setRoleState: (role: RoleType) => void;
  loadProfileForRole: (role: RoleType) => void;
}

export function useRegistration() {
  const [regStep, setRegStep] = useState(0);
  const [regPersonal, setRegPersonal] = useState({ fullName: '', mobile: '', email: '' });
  const [regOtp, setRegOtp] = useState('');
  const [regOtpHint, setRegOtpHint] = useState('');
  const [regHotel, setRegHotel] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    districtId: '',
  });
  const [regDistricts, setRegDistricts] = useState<any[]>([]);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [createdHotelId, setCreatedHotelId] = useState('');
  const [showPayConfirm, setShowPayConfirm] = useState(false);

  const handleRegPersonalNext = async (
    e: React.FormEvent,
    callbacks: Omit<RegistrationCallbacks, 'setTokenState' | 'setRoleState' | 'loadProfileForRole'>
  ) => {
    e.preventDefault();
    if (!regPersonal.fullName || regPersonal.mobile.length !== 10) {
      callbacks.setError('Full Name and a 10-digit mobile number are required');
      return;
    }
    callbacks.setError('');
    callbacks.setLoading(true);
    try {
      const fullPhone = `+91${regPersonal.mobile.trim()}`;
      const res = await api.ownerRegister(
        regPersonal.fullName.trim(),
        fullPhone,
        regPersonal.email.trim() || undefined
      );
      setRegOtpHint(res.otp || '');
      setRegOtp('');
      setRegStep(1);
    } catch (err: any) {
      callbacks.setError(err.message || 'Registration request failed');
    } finally {
      callbacks.setLoading(false);
    }
  };

  const handleRegOtpVerify = async (
    e: React.FormEvent,
    callbacks: Omit<RegistrationCallbacks, 'loadProfileForRole'>
  ) => {
    e.preventDefault();
    if (regOtp.length !== 6) {
      callbacks.setError('OTP must be a 6-digit code');
      return;
    }
    callbacks.setError('');
    callbacks.setLoading(true);
    try {
      const fullPhone = `+91${regPersonal.mobile.trim()}`;
      const res = await api.ownerVerifyOtp(fullPhone, regOtp.trim());
      api.setToken(res.token);
      localStorage.setItem('pehchaan_role', 'owner');
      localStorage.setItem('pehchaan_token', res.token);
      callbacks.setTokenState(res.token);
      callbacks.setRoleState('owner');

      setRegHotel(prev => ({ ...prev, state: '', districtId: '' }));
      setRegDistricts([]);
      setRegStep(2);
    } catch (err: any) {
      callbacks.setError(err.message || 'OTP verification failed');
    } finally {
      callbacks.setLoading(false);
    }
  };

  const loadDistrictsForState = async (stateName: string) => {
    if (!stateName || stateName === 'Select State') {
      setRegDistricts([]);
      return;
    }
    setDistrictsLoading(true);
    try {
      const res = await api.getDistricts(stateName);
      setRegDistricts(res.districts || []);
      setRegHotel(prev => ({ ...prev, districtId: '' }));
    } catch {
      setRegDistricts([]);
    } finally {
      setDistrictsLoading(false);
    }
  };

  const handleStateChange = (stateName: string) => {
    setRegHotel(prev => ({ ...prev, state: stateName, districtId: '' }));
    loadDistrictsForState(stateName);
  };

  const handleRegHotelNext = async (
    e: React.FormEvent,
    callbacks: Omit<RegistrationCallbacks, 'setTokenState' | 'setRoleState' | 'loadProfileForRole'>
  ) => {
    e.preventDefault();
    if (!regHotel.name || !regHotel.address || !regHotel.state || !regHotel.districtId) {
      callbacks.setError('Hotel Name, Address, State and District are required');
      return;
    }
    callbacks.setError('');
    callbacks.setLoading(true);
    try {
      const res = await api.addHotel({
        name: regHotel.name,
        address: regHotel.address,
        city: regHotel.city || undefined,
        state: regHotel.state,
        pincode: regHotel.pincode || undefined,
        districtId: regHotel.districtId,
      });
      setCreatedHotelId(res.hotel.id);
      setRegStep(3);
    } catch (err: any) {
      callbacks.setError(err.message || 'Could not register hotel details');
    } finally {
      callbacks.setLoading(false);
    }
  };

  const handleRegPaymentConfirm = async (
    callbacks: Omit<RegistrationCallbacks, 'setTokenState' | 'setRoleState'>
  ) => {
    setShowPayConfirm(false);
    callbacks.setError('');
    callbacks.setLoading(true);
    try {
      if (createdHotelId) {
        await api.subscribeHotel(createdHotelId);
      }
      // Success: reload profile and show dashboard
      await callbacks.loadProfileForRole('owner');
      // Reset registration wizard
      setRegStep(0);
      setRegPersonal({ fullName: '', mobile: '', email: '' });
      setRegOtp('');
      setRegOtpHint('');
      setRegHotel({ name: '', address: '', city: '', state: '', pincode: '', districtId: '' });
    } catch (err: any) {
      callbacks.setError(err.message || 'Payment processing failed');
    } finally {
      callbacks.setLoading(false);
    }
  };

  return {
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
  };
}
