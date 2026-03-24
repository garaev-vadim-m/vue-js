import { defineStore } from 'pinia';
import { getUsers } from '../api/getUsers';
import type { AxiosRequestConfig } from 'axios';
import { ref } from 'vue';

export type User = {
  id: number;
  name: string;
  email: string;
};

export const useUserModel = defineStore('useUserModel', () => {
  const users = ref();

  async function onUsers({ params }: { params?: AxiosRequestConfig } = {}) {
    const { data } = await getUsers({
      ...params,
    });
    console.log(data);
    if (!data) return;
    users.value = [...data];
  }

  return {
    users,
    onUsers,
  };
});
