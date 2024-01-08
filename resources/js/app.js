import { createApp } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheSidebar from './components/TheSidebar.vue';
import TheContent from './components/TheContent.vue';
import store from './store';

const app = createApp({});
app.use(store);

app.component('the-header', TheHeader);
app.component('the-sidebar', TheSidebar);
app.component('the-content', TheContent);

app.mount('#app');
