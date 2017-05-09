// @flow
/* eslint no-new: "off" */

import Vue from 'vue';
// import VueRouter from 'vue-router';
import App from './App.vue';
// import routes from './router/index';
import { createRouter } from './router';
import { createStore } from './vuex/index';
import test from './component/test';

test('LvCheng');

const store = createStore();
const router = createRouter();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
