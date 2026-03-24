import { apiClient } from '@/shared/api/apiClient';

export function sendLogout() {
  return apiClient.post('/logout');
}
