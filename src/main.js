// @flow

import Vue from 'vue';
// import VueRouter from 'vue-router';
import App from './App.vue';
// import routes from './router/index';
import { createRouter } from './router';
import { createStore } from './vuex/index';
import test from './component/test';

// console.log('---- routes ----', routes);

// Vue.use(Vuex);
// Vue.use(VueRouter);

// const router = new VueRouter({
//     mode: 'history',
//     routes,
// });

test('LvCheng');
/* eslint no-new: "off" */
// new Vue({
//     el: '#app',
//     // router,
//     render: h => h(App),
// });
// .$mount('#app');

const store = createStore();
const router = createRouter();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
