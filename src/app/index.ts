import { createApp } from 'vue';
import './index.css';
import index from '@/app/index.vue';
import { router } from './router/index.ts';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(index);
app.use(router);
app.use(pinia);
app.mount('#app');
