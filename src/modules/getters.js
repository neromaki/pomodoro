/**
 * brioche/getters
 * Contains all the Vuex getters for the app, which components use to have local
 * access to Vuex store state
 */

const getters = {

    // AUTH
    authUser: s => s.user,
    authToken: s => s.token,
    authCheck: s => !!s.user,
};

export default getters;
