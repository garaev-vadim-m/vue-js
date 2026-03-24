import { apiClient } from '@/shared/api/apiClient';
import type { AxiosRequestConfig } from 'axios';

export const getUsers = (params: AxiosRequestConfig = {}) => {
  return apiClient.get('/users', { ...params });
};
