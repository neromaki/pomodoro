/**
 * brioche/state
 * Contains the Vuex app state
 */

import Cookie from 'js-cookie';

const state = {
    token: Cookie.get('token') || null,
    user: Cookie.get('user') || null,
};

export default state;
