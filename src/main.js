// @flow
/* eslint no-new: "off" */

import Vue from 'vue';
import App from './App.vue';
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
