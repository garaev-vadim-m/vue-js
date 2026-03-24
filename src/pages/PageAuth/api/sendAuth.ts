import { apiClient } from '@/shared/api/apiClient';

export async function sendAuth(user: { email: string; password: string }) {
  return apiClient.post('/login', user);
}
