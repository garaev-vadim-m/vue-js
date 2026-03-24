import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeoutErrorMessage: 'The response time has been exceeded',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // достаём токен
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // подставляем
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    return Promise.reject(error);
  },
);
