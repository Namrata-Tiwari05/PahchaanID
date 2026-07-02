export const STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

export const ALL_DISTRICTS = [
  { id: 'mock-district-Uttar Pradesh-0', name: 'Lucknow', state: 'Uttar Pradesh' },
  { id: 'mock-district-Uttar Pradesh-1', name: 'Agra', state: 'Uttar Pradesh' },
  { id: 'mock-district-Uttar Pradesh-2', name: 'Varanasi', state: 'Uttar Pradesh' },
  { id: 'mock-district-Uttar Pradesh-3', name: 'Kanpur', state: 'Uttar Pradesh' },
  { id: 'mock-district-Uttar Pradesh-4', name: 'Noida', state: 'Uttar Pradesh' },
  { id: 'mock-district-Uttar Pradesh-5', name: 'Ghaziabad', state: 'Uttar Pradesh' },
  { id: 'mock-district-Maharashtra-0', name: 'Mumbai', state: 'Maharashtra' },
  { id: 'mock-district-Maharashtra-1', name: 'Pune', state: 'Maharashtra' },
  { id: 'mock-district-Maharashtra-2', name: 'Nagpur', state: 'Maharashtra' },
  { id: 'mock-district-Maharashtra-3', name: 'Thane', state: 'Maharashtra' },
  { id: 'mock-district-Maharashtra-4', name: 'Nashik', state: 'Maharashtra' },
  { id: 'mock-district-Rajasthan-0', name: 'Jaipur', state: 'Rajasthan' },
  { id: 'mock-district-Rajasthan-1', name: 'Jodhpur', state: 'Rajasthan' },
  { id: 'mock-district-Delhi-0', name: 'New Delhi', state: 'Delhi' },
  { id: 'mock-district-Gujarat-0', name: 'Ahmedabad', state: 'Gujarat' },
  { id: 'mock-district-Karnataka-0', name: 'Bangalore', state: 'Karnataka' },
];

export const getHotelDistrictId = (h: any) => {
  if (h && h.districtId) return h.districtId;
  // Fallbacks based on city/state
  if (h && h.city === 'Lucknow') return 'mock-district-Uttar Pradesh-0';
  if (h && h.city === 'Agra') return 'mock-district-Uttar Pradesh-1';
  if (h && h.city === 'Mumbai') return 'mock-district-Maharashtra-0';
  if (h && h.city === 'Pune') return 'mock-district-Maharashtra-1';
  if (h && h.city === 'Jaipur') return 'mock-district-Rajasthan-0';
  if (h && h.city === 'New Delhi') return 'mock-district-Delhi-0';
  if (h && h.city === 'Ahmedabad') return 'mock-district-Gujarat-0';
  if (h && h.city === 'Bangalore') return 'mock-district-Karnataka-0';
  return 'mock-district-Uttar Pradesh-0';
};

export const getGuestDetailName = (person: any, idx: number): string => {
  if (!person) return 'Guest';
  return person.verified ? (person.name || 'Guest') : 'Invalid ID';
};

export const getGuestDetailAge = (person: any, idx: number): any => {
  if (!person) return 'N/A';
  return person.verified ? (person.response?.details?.age || person.age || 'N/A') : 'N/A';
};

export const getGuestDetailAddress = (person: any, idx: number): string => {
  if (!person) return 'Address not provided';
  if (!person.verified) return person.response?.message || 'Invalid ID / No record found in GovIdRecord';
  return person.response?.details?.address || person.address || 'Address verified';
};
