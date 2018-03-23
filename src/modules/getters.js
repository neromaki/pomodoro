/**
 * brioche/getters
 * Contains all the Vuex getters for the app, which components use to have local
 * access to Vuex store state
 */

const getters = {
    appLoading: s => s.app.loading,
    timer: s => s.timer,
    durations: s => s.durations,
    schedule: s => s.schedule,
    progressStyle: s => s.progressStyle,
};

export default getters;
