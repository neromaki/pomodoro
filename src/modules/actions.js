/**
 * brioche/actions
 * Contains all the Vuex actions for the app
 */

// Import Vue, axios for API access and the Vuex store
import Vue from 'vue';
import axios from 'axios';
import store from './store';
import Cookie from 'js-cookie';

// Configure Vue's usage of axios
Vue.use((v, a) => {
    v.axios = a;
    Object.defineProperties(v.prototype, {
        axios: {
            get() {
                return a;
            },
        },
        $http: {
            get() {
                return a;
            },
        },
    });
}, axios);

// Set headers required by Laravel to request resources
Vue.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]');

/* eslint-disable comma-dangle */
// If the user has auth'd, set the Authorization Bearer header to the JSON Webtoken value for API validation
Vue.axios.interceptors.request.use(
    (config) => {
        if (store.getters.authToken) {
            config.headers.common.Authorization = `Bearer ${store.getters.authToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);


// All of the app's actions
const actions = {
    // AUTH
    AUTH_LOGIN({ commit }, credentials) {
        commit('SET_APP_LOADING', true);
        return new Promise((resolve, reject) => {
            Vue.axios.post('/api/auth/login', credentials)
                .then((r) => {
                    if (r.data.status === 'ok') {
                        const { token } = r.data;
                        commit('SET_USER', {
                            user: credentials.email,
                            token,
                            remember: null,
                        });
                        commit('SET_APP_LOADING', false);
                        resolve(r);
                        return;
                    }
                    commit('UNSET_USER');
                    commit('SET_APP_LOADING', false);
                    reject(r);
                })
                .catch((e) => {
                    const r = e.response;

                    if (r.status !== 'ok') {
                        commit('UNSET_USER');
                        commit('SET_APP_LOADING', false);
                        reject(r.data);
                    }
                });
        });
    },

    AUTH_LOGOUT({ commit }, router) {
        commit('UNSET_USER');
    },


    UPDATE_USER_COOKIE({ commit }, payload) {
        let userCookie = (typeof Cookie.get('userPrefs') !== 'undefined' ? Cookie.getJSON('userPrefs') : []);
        userCookie.push('somedata');
        _.pull(userCookie, 'somedata');
    },
};

export default actions;
