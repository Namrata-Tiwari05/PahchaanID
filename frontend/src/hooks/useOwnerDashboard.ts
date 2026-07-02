import React, { useState } from 'react';
import * as api from '../services/apiService';
import { ScreenType, HotelDetailTabType } from './useNavigation';
import { RoleType } from './useAuth';

interface OwnerDashboardCallbacks {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  loadProfileForRole: (role: RoleType) => Promise<void>;
  setHotelDetailTab: (tab: HotelDetailTabType) => void;
  goTo: (target: ScreenType) => void;
}

export function useOwnerDashboard() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [showAddManagerModal, setShowAddManagerModal] = useState(false);
  const [newManagerName, setNewManagerName] = useState('');
  const [newManagerPhone, setNewManagerPhone] = useState('');
  const [detailVerifications, setDetailVerifications] = useState<any[]>([]);

  const handleOpenHotelDetails = async (hotel: any, callbacks: Omit<OwnerDashboardCallbacks, 'loadProfileForRole'>) => {
    callbacks.setLoading(true);
    setSelectedHotel(hotel);
    callbacks.setHotelDetailTab('details');
    callbacks.goTo('hotel-detail');
    try {
      // Get verifications for this hotel
      const res = await api.getHotelVerifications(hotel.id);
      setDetailVerifications(res.verifications || []);

      // Re-fetch owner profile to refresh active managers list
      const profileRes = await api.ownerProfile();
      const updated = profileRes.owner.hotels?.find((h: any) => h.id === hotel.id);
      if (updated) {
        setSelectedHotel({
          id: updated.id,
          name: updated.name,
          address: updated.address,
          city: updated.city || '',
          state: updated.state || '',
          pincode: updated.pincode || '',
          status: updated.status,
          managers: updated.managers || [],
          subscriptions: updated.subscriptions || [],
        });
      }
    } catch {
      // fallback
    } finally {
      callbacks.setLoading(false);
    }
  };

  const handleAddManager = async (e: React.FormEvent, callbacks: OwnerDashboardCallbacks) => {
    e.preventDefault();
    if (!newManagerName || newManagerPhone.length !== 10) {
      callbacks.setError('Please provide manager name and a valid 10-digit mobile number');
      return;
    }
    callbacks.setError('');
    callbacks.setLoading(true);
    try {
      const hotelId = selectedHotel ? selectedHotel.id : hotels[0]?.id;
      if (!hotelId) throw new Error('No hotel selected');

      const fullPhone = `+91${newManagerPhone.trim()}`;
      await api.addManagerToHotel(hotelId, newManagerName.trim(), fullPhone);

      setShowAddManagerModal(false);
      setNewManagerName('');
      setNewManagerPhone('');

      // Reload details
      if (selectedHotel) {
        await handleOpenHotelDetails(selectedHotel, callbacks);
      } else {
        await callbacks.loadProfileForRole('owner');
      }
    } catch (err: any) {
      callbacks.setError(err.message || 'Failed to add manager');
    } finally {
      callbacks.setLoading(false);
    }
  };

  const handleRemoveManager = async (managerId: string, callbacks: Omit<OwnerDashboardCallbacks, 'loadProfileForRole' | 'setHotelDetailTab' | 'goTo'>) => {
    if (!selectedHotel) return;
    if (!confirm('Are you sure you want to remove this manager?')) return;

    callbacks.setError('');
    callbacks.setLoading(true);
    try {
      await api.removeManagerFromHotel(selectedHotel.id, managerId);
      // Reload details (mock callbacks.goTo and callbacks.setHotelDetailTab as simple no-ops or omit)
      const fakeCallbacks = {
        setLoading: callbacks.setLoading,
        setError: callbacks.setError,
        setHotelDetailTab: () => {},
        goTo: () => {},
      };
      await handleOpenHotelDetails(selectedHotel, fakeCallbacks);
    } catch (err: any) {
      callbacks.setError(err.message || 'Failed to remove manager');
    } finally {
      callbacks.setLoading(false);
    }
  };

  return {
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
  };
}
