// @flow

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router/index';
import test from './component/test';

console.log('---- routes ----', routes);

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
});

test('LvCheng');
/* eslint no-new: "off" */
new Vue({
    // el: '#app',
    router,
    render: h => h(App),
}).$mount('#app');
