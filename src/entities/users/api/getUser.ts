import { apiClient } from '@/shared/api/apiClient';

export const getUser = async (id: number, params = {}) => {
  return apiClient.get(`/users/${id}`, { ...params });
};
