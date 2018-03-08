/**
 * brioche/stpre
 * Combines all the modules to create the actual Vuex data store
 */

// Import Vue and requirements
import Vue from 'vue';
import Vuex from 'vuex';

// Import all our modules
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

// Create the Vuex store
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;
