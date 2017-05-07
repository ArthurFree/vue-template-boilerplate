/* eslint global-require: 'off' */
const routes = [
    {
        path: '/',
        name: 'home',
        component: (resolve) => {
            require.ensure(['../views/index.vue'], () => {
                resolve(require('../views/index.vue'));
            });
        },
    },
    {
        path: '/list',
        name: 'list',
        component: (resolve) => {
            require.ensure(['../views/list.vue'], () => {
                resolve(require('../views/list.vue'));
            });
        },
    },
];

export default routes;
