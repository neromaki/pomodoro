/**
 * brioche/routes
 * Contains all the Vue routes for the app
 */

import VueRouter from 'vue-router';
import Timer from '../components/Timer.vue';

const routes = [
    {
        name: 'timer',
        path: '/',
        component: Timer,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
