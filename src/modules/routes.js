/**
 * brioche/routes
 * Contains all the Vue routes for the app
 */

import VueRouter from 'vue-router';

const routes = [
    {
        name: 'example',
        path: '/example',
        // component: Dashboard,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
