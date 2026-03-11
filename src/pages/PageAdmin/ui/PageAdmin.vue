<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import Button from '@/shared/ui/Button.vue';
import MainLayout from '@/widgets/layout/MainLayout.vue';
import InputForm from '@/shared/ui/InputForm.vue';
import { useRouter } from 'vue-router';

type User = {
  id: number;
  name: string;
  email: string;
};
const users = ref<User[]>([]);
async function getUsers(params = {}) {
  const data = ref([
    {
      id: 1,
      name: 'name',
      email: 'email',
    },
    {
      id: 2,
      name: 'name',
      email: 'email',
    },
    {
      id: 3,
      name: 'name',
      email: 'email',
    },
    {
      id: 4,
      name: 'name',
      email: 'email',
    },
    {
      id: 5,
      name: 'name',
      email: 'email',
    },
    {
      id: 6,
      name: 'name',
      email: 'email',
    },
  ]);
  users.value = [...data.value];
}

const modelUser = ref({
  id: 0,
  name: '',
  email: '',
});

async function setUser(formData: Pick<User, 'name' | 'email'>) {
  // await apiClient.post('/users', formData);
  users.value.push({
    ...formData,
    id: Math.random(),
  });
  modelUser.value.name = '';
  modelUser.value.email = '';
  // getUsers();
}

async function deleteUser(user: User) {
  users.value = users.value.filter(({ id }) => id !== user.id);
}

async function setUpdateUser(user: User) {
  const { id } = modelUser.value;

  // await apiClient.patch(`/users/${id}`, { name, email });
  const userIndex = users.value.findIndex(({ id }) => id === user.id);
  users.value[userIndex] = {
    id,
    name: modelUser.value.name,
    email: modelUser.value.email,
  };
  modelUser.value.name = '';
  modelUser.value.email = '';
}

function changeUser(user: User) {
  modelUser.value = { ...user };
}

const router = useRouter();

function onExit() {
  sessionStorage.removeItem('user');
  router.push('/');
}

onBeforeMount(getUsers);
</script>

<template>
  <MainLayout>
    <template #header>
      <div class="flex items-center justify-between w-[100%]">
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
        <Button @click="changeUser(user)">change</Button>
        <Button @click="setUpdateUser(user)">update</Button>
        <Button type="submit" @click.prevent="deleteUser(user)">DeleteUser</Button>
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
