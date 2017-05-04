// @flow

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/index';
import test from './component/test';

const router = new VueRouter({
    mode: 'history',
    routes,
});

test('LvCheng');
