/**
 * LaraVue
 * @type    Vue / Laravel app
 * @author  Shaun Wall
 */

// Import Vue stuff
import Vue from 'vue';
import Vuex from 'vuex';
// import VueRouter from 'vue-router';
import 'promise-polyfill/src/polyfill';

// Import App component that contains all other components in the app
import App from './components/App.vue';

// Import app state, routes etc
// import router from './modules/routes';
import store from './modules/store';

// Set Vue to use aforementioned stuff
Vue.use(Vuex);
// Vue.use(VueRouter);

// Require lodash globally
window._ = require('lodash');

// Flag for showing console logs
window.debug_mode = true;

// Console log wrapper that displays based on window.debug_mode value
window.log = (message) => {
    if (window.debug_mode) {
        // eslint-disable-next-line
        console.log(message);
    }
};


// Instantiate the app!
// eslint-disable-next-line
const app = new Vue({
    store,
    // router,
    el: '#app',
    components: {
        App,
    },
    methods: {},
    render: h => h(App),
});
