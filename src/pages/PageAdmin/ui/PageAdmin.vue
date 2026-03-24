<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import Button from '@/shared/ui/Button.vue';
import MainLayout from '@/widgets/layout/MainLayout.vue';
import InputForm from '@/shared/ui/InputForm.vue';
import { useRouter } from 'vue-router';
import { getUsers } from '@/entities/users/api/getUsers';
import { useUserModel, type User } from '@/entities/users/model/userModel';
import { storeToRefs } from 'pinia';
import { sendLogout } from '@/pages/PageAuth/api/sendLogout';

const userModel = useUserModel();

const { users } = storeToRefs(userModel);

const modelUser = ref({
  id: 0,
  name: '',
  email: '',
});

async function setUser(formData: Pick<User, 'name' | 'email'>) {
  // await apiClient.post('/users', formData);

  modelUser.value.name = '';
  modelUser.value.email = '';
}

const router = useRouter();

async function onExit() {
  try {
    // await sendLogout();
    sessionStorage.removeItem('token');
    router.push('/');
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(userModel.onUsers);
</script>

<template>
  <MainLayout>
    <template #header>
      <div class="flex items-center justify-between w-full">
        <RouterLink to="/">Главная</RouterLink>
        <Button @click="onExit">Выйти</Button>
      </div>
    </template>
  </MainLayout>
  <div :class="classes.root">
    <h1>Страница для валидации</h1>
    <div v-for="user of users">
      <div :class="classes.buttonList">
        {{ user }}
        <!-- <Button @click="changeUser(user)">change</Button>
        <Button @click="setUpdateUser(user)">update</Button>
        <Button type="submit" @click.prevent="deleteUser(user)">DeleteUser</Button> -->
      </div>
    </div>
    <InputForm v-model="modelUser.name" />
    <InputForm v-model="modelUser.email" />
    <Button type="submit" @click.prevent="setUser(modelUser)">SetUser</Button>
  </div>
</template>

<style module="classes">
.root {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.buttonList {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
