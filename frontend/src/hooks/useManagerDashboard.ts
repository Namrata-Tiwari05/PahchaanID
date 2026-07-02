import React, { useState } from 'react';
import * as api from '../services/apiService';

interface ManagerDashboardCallbacks {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export function useManagerDashboard() {
  const [verifyType, setVerifyType] = useState<'choose' | 'family' | 'couple' | 'pro' | 'student' | 'done'>('choose');
  const [primaryIdType, setPrimaryIdType] = useState('aadhaar');
  const [primaryIdNumber, setPrimaryIdNumber] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [purpose, setPurpose] = useState('');

  // Couple details
  const [coupleId1Type, setCoupleId1Type] = useState('aadhaar');
  const [coupleId1Number, setCoupleId1Number] = useState('');
  const [coupleId2Type, setCoupleId2Type] = useState('aadhaar');
  const [coupleId2Number, setCoupleId2Number] = useState('');

  // Professional details
  const [proIdType, setProIdType] = useState('aadhaar');
  const [proIdNumber, setProIdNumber] = useState('');

  // Student details
  const [studentIdType, setStudentIdType] = useState('aadhaar');
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [institution, setInstitution] = useState('');

  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [managerVerifications, setManagerVerifications] = useState<any[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);

  const resetVerificationForm = () => {
    setVerifyType('choose');
    setPrimaryIdNumber('');
    setPrimaryIdType('aadhaar');
    setAdults(1);
    setChildren(0);
    setPurpose('');
    setCoupleId1Number('');
    setCoupleId1Type('aadhaar');
    setCoupleId2Number('');
    setCoupleId2Type('aadhaar');
    setProIdNumber('');
    setProIdType('aadhaar');
    setStudentIdNumber('');
    setStudentIdType('aadhaar');
    setInstitution('');
    setVerificationResult(null);
  };

  const handleVerificationSubmit = async (e: React.FormEvent, callbacks: ManagerDashboardCallbacks) => {
    e.preventDefault();
    callbacks.setError('');

    let persons: Array<{ idType: string; idNumber: string; name?: string }> = [];

    if (verifyType === 'family') {
      if (!primaryIdNumber || primaryIdNumber.length < 4) {
        callbacks.setError('Please enter a valid primary member ID number');
        return;
      }
      persons = [{ idType: api.mapIdType(primaryIdType), idNumber: primaryIdNumber }];
    } else if (verifyType === 'couple') {
      if (coupleId1Number.length < 4 || coupleId2Number.length < 4) {
        callbacks.setError('Please enter ID numbers for both guests');
        return;
      }
      persons = [
        { idType: api.mapIdType(coupleId1Type), idNumber: coupleId1Number },
        { idType: api.mapIdType(coupleId2Type), idNumber: coupleId2Number },
      ];
    } else if (verifyType === 'pro') {
      if (!proIdNumber || proIdNumber.length < 4) {
        callbacks.setError('Please enter a valid Gov ID number');
        return;
      }
      persons = [{ idType: api.mapIdType(proIdType), idNumber: proIdNumber }];
    } else if (verifyType === 'student') {
      if (!studentIdNumber || studentIdNumber.length < 4) {
        callbacks.setError('Please enter a valid Student ID / Gov ID number');
        return;
      }
      persons = [{ idType: api.mapIdType(studentIdType), idNumber: studentIdNumber }];
    }

    callbacks.setLoading(true);
    try {
      const apiType = verifyType === 'pro' ? 'PROFESSIONAL' : verifyType.toUpperCase();
      const res = await api.createVerification({
        type: apiType as any,
        adults: verifyType === 'family' ? adults : 1,
        children: verifyType === 'family' ? children : 0,
        purpose: purpose || undefined,
        persons,
      });

      setVerificationResult(res.verification);
      setVerifyType('done');

      // Refresh verifications list
      const verifRes = await api.getManagerVerifications();
      setManagerVerifications(verifRes.verifications || []);
    } catch (err: any) {
      callbacks.setError(err.message || 'Verification request failed');
    } finally {
      callbacks.setLoading(false);
    }
  };

  return {
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
  };
}
