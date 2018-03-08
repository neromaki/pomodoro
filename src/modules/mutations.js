/**
 * brioche/mutations
 * Contains all the Vuex mutations for the app
 */

// Import Vue and requirements
import Cookie from 'js-cookie';
import state from './state';

const mutations = {
    // APP
    SET_APP_LOADING(store, payload) {
        state.app.loading = payload;
    },

    // AUTH
    SET_USER(store, payload) {
        state.user = payload.user;
        state.token = payload.token;
        Cookie.set('user', payload.user);
        Cookie.set('token', payload.token, {
            expires: payload.remember ? 365 : null,
        });
    },

    UNSET_USER() {
        state.user = null;
        state.token = null;
        Cookie.remove('token');
        Cookie.remove('user');
    },
};

export default mutations;
