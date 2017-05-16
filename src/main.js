// @flow
/* eslint no-new: "off" */

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import { tools } from 'utils';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './vuex/index';
import test from './components/test';

test('LvCheng');

const store = createStore();
const router = createRouter();

sync(store, router);

tools.ajax({
    url: 'topics',
    params: {
        page: 1,
        limit: 50,
        tab: 'good',
        mdrender: 'true',
    },
    info: '获取主题首页',
    isShowSuccess: true,
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
