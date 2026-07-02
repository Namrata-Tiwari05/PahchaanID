const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
const BASE = `${API_URL}/api/v1`;

let _token: string | null = null;

// Initialize token from localStorage on client-side
if (typeof window !== 'undefined') {
  _token = localStorage.getItem('pehchaan_token');
}

export function setToken(token: string | null) {
  _token = token;
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('pehchaan_token', token);
    } else {
      localStorage.removeItem('pehchaan_token');
      localStorage.removeItem('pehchaan_role');
    }
  }
}

export function getToken() {
  return _token;
}

async function request<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers,
  });

  let data: any;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data as T;
}

// ID Type mapping (frontend key -> backend enum)
const ID_TYPE_MAP: Record<string, string> = {
  aadhaar: 'AADHAAR',
  pan: 'PAN',
  licence: 'DRIVING_LICENSE',
  passport: 'PASSPORT',
  voter: 'VOTER_ID',
  student_id: 'STUDENT_ID',
};

export function mapIdType(frontendKey: string): string {
  return ID_TYPE_MAP[frontendKey] || frontendKey.toUpperCase();
}

// ─── Owner Endpoints ───

export async function ownerRegister(name: string, phone: string, email?: string) {
  return await request<{ message: string; ownerId: string; otp: string }>(
    '/owner/register',
    { method: 'POST', body: JSON.stringify({ name, phone, email }) },
  );
}

export async function ownerLogin(phone: string) {
  return await request<{ message: string; otp: string }>(
    '/owner/login',
    { method: 'POST', body: JSON.stringify({ phone }) },
  );
}

export async function ownerVerifyOtp(phone: string, otp: string) {
  return await request<{ message: string; token: string }>(
    '/owner/verify-otp',
    { method: 'POST', body: JSON.stringify({ phone, otp }) },
  );
}

export async function ownerProfile() {
  return await request<{ owner: any }>('/owner/profile');
}

export async function addHotel(data: {
  name: string;
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  districtId?: string;
  latitude?: number;
  longitude?: number;
}) {
  return await request<{ message: string; hotel: any }>('/owner/hotel', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
    }),
  });
}

export async function subscribeHotel(hotelId: string) {
  return await request<{ message: string; subscription: any }>(
    `/owner/hotel/${hotelId}/subscribe`,
    { method: 'POST' },
  );
}

export async function addManagerToHotel(hotelId: string, name: string, phone: string) {
  return await request<{ message: string; manager: any }>(
    `/owner/hotel/${hotelId}/manager`,
    { method: 'POST', body: JSON.stringify({ name, phone }) },
  );
}

export async function removeManagerFromHotel(hotelId: string, managerId: string) {
  return await request<{ message: string }>(
    `/owner/hotel/${hotelId}/manager/${managerId}`,
    { method: 'DELETE' },
  );
}

export async function getHotelVerifications(hotelId: string) {
  return await request<{ verifications: any[] }>(
    `/owner/hotel/${hotelId}/verifications`,
  );
}

// ─── Manager Endpoints ───

export async function managerLogin(phone: string) {
  return await request<{ message: string; otp: string }>(
    '/manager/login',
    { method: 'POST', body: JSON.stringify({ phone }) },
  );
}

export async function managerVerifyOtp(phone: string, otp: string) {
  return await request<{ message: string; token: string }>(
    '/manager/verify-otp',
    { method: 'POST', body: JSON.stringify({ phone, otp }) },
  );
}

export async function managerProfile() {
  return await request<{ manager: any }>('/manager/profile');
}

export async function createVerification(data: {
  type: 'COUPLE' | 'FAMILY' | 'STUDENT' | 'PROFESSIONAL';
  adults?: number;
  children?: number;
  purpose?: string;
  persons: Array<{ name?: string; idType: string; idNumber: string }>;
}) {
  return await request<{ message: string; verification: any }>(
    '/manager/verification',
    { method: 'POST', body: JSON.stringify(data) },
  );
}

export async function getManagerVerifications() {
  return await request<{ verifications: any[] }>('/manager/verifications');
}

// ─── Admin Endpoints ───

export async function adminLogin(phone: string) {
  return await request<{ message: string; otp: string }>(
    '/admin/login',
    { method: 'POST', body: JSON.stringify({ phone }) },
  );
}

export async function adminVerifyOtp(phone: string, otp: string) {
  return await request<{ message: string; token: string }>(
    '/admin/verify-otp',
    { method: 'POST', body: JSON.stringify({ phone, otp }) },
  );
}

export async function adminDashboard() {
  return await request<any>('/admin/dashboard');
}

// ─── Super Admin Endpoints ───

export async function superAdminLogin(phone: string) {
  return await request<{ message: string; otp: string }>(
    '/superadmin/login',
    { method: 'POST', body: JSON.stringify({ phone }) },
  );
}

export async function superAdminVerifyOtp(phone: string, otp: string) {
  return await request<{ message: string; token: string }>(
    '/superadmin/verify-otp',
    { method: 'POST', body: JSON.stringify({ phone, otp }) },
  );
}

export async function superAdminDashboard() {
  return await request<any>('/superadmin/dashboard');
}

export async function superAdminAdmins() {
  return await request<{ admins: any[] }>('/superadmin/admins');
}

export async function createAdmin(name: string, phone: string, stateName?: string, districtName?: string) {
  return await request<{ message: string; admin: any }>(
    '/superadmin/admin',
    { method: 'POST', body: JSON.stringify({ name, phone }) },
  );
}

export async function updateAdmin(id: string, name: string, phone: string, stateName: string, districtName: string) {
  throw new Error("Backend endpoint PUT /superadmin/admin/:id is missing");
}

export async function toggleAdminStatus(id: string) {
  throw new Error("Backend endpoint POST /superadmin/admin/:id/toggle is missing");
}

export async function superAdminDistricts() {
  throw new Error("Backend endpoint GET /superadmin/districts is missing");
}

// ─── District Endpoints (Public) ───

export async function getDistricts(state: string) {
  return await request<{ districts: any[] }>(
    `/districts?state=${encodeURIComponent(state)}`,
  );
}
