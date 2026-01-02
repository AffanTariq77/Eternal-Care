import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Default URLs for dev
const DEFAULT_LOCAL = 'http://localhost:4000';
const ANDROID_EMULATOR_LOCAL = 'http://10.0.2.2:4000';

const API_URL =
  (process.env.EXPO_PUBLIC_API_URL as string) ||
  (Platform.OS === 'android' ? ANDROID_EMULATOR_LOCAL : DEFAULT_LOCAL);

async function getToken() {
  return await AsyncStorage.getItem('token');
}

async function request(path: string, opts: RequestInit = {}) {
  const token = await getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(opts.headers as any) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...opts, headers });
  } catch (err: any) {
    // Friendly error for network failures (common on Android if using localhost)
    throw { error: 'Cannot reach backend. Check EXPO_PUBLIC_API_URL or emulator/device network.' };
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export async function signup(name: string, email: string, password: string) {
  return request('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
}

export async function login(email: string, password: string) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function getProfile(id: string) {
  return request(`/profile/${id}`);
}

export async function registerToken(token: string) {
  return request('/auth/register-token', { method: 'POST', body: JSON.stringify({ token }) });
}

export async function createBooking(packageId: string, date: string, meta?: any) {
  return request('/bookings', { method: 'POST', body: JSON.stringify({ packageId, date, meta }) });
}

export async function getBooking(id: string) {
  return request(`/bookings/${id}`);
}

export async function payBooking(bookingId: string, body: any) {
  return request(`/bookings/${bookingId}/pay`, { method: 'POST', body: JSON.stringify(body) });
}

export default { signup, login, getProfile, registerToken, createBooking, getBooking, payBooking };
