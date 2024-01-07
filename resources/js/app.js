
require('./bootstrap');

window.Vue = require('vue').default;

Vue.component('the-header', require('./components/TheHeader.vue').default);
Vue.component('the-sidebar', require('./components/TheSidebar.vue').default);

const app = new Vue({
    el: '#app',
});
