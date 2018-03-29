/**
 * brioche/mutations
 * Contains all the Vuex mutations for the app
 */

// Import Vue and requirements
import Cookie from 'js-cookie';

const mutations = {
    // APP
    APP_INIT(store) {
        _.each(store.durations, (duration, key) => {
            duration.minutes = duration.defaults.minutes;
            duration.seconds = duration.defaults.seconds;
        });
    },

    TIMER_INIT(store) {
        store.timer.duration = 0;
        store.timer.time = '';
        store.timer.output = '00:00';
        store.timer.percent = 0;
        store.timer.state = 'stopped';
        store.timer.timer = '';
    },

    TIMER_UPDATE(store, payload) {
        _.each(payload, (value, key) => {
            store.timer[key] = value;
        });
    },

    TIMER_CLEAR(store, payload) {
        window.clearInterval(store.timer.timer);
    },
    TIMER_UPDATE_STYLE(store) {
        store.progressStyle.pie = (store.timer.percent > 50 ? 'clip: rect(auto, auto, auto, auto);' : '');
        // eslint-disable-next-line
        store.progressStyle.left = 'transform: rotate('+ (store.timer.percent * 3.6) +'deg);';
        store.progressStyle.right = (store.timer.percent < 50 ? 'display: none;' : 'transform: rotate(180deg);');
    },

    SCHEDULE_CREATE(store) {
        store.schedule = [
            store.durations.focus,
            store.durations.short_break,
            store.durations.focus,
            store.durations.short_break,
            store.durations.focus,
            store.durations.long_break,
        ];
    },

    SCHEDULE_PULL(store) {
        _.pullAt(store.schedule, 0);
    },

    USER_DURATIONS_GET(store) {
        const userDurations = Cookie.getJSON('user_durations');
        _.each(userDurations, (object, key) => {
            store.durations[key].title = object.title;
            store.durations[key].duration = object.duration;
        });
    },

    USER_DURATIONS_SET(store, payload) {
        const userDurations = {};
        _.each(payload, (object, key) => {
            userDurations[key] = object;
            store.durations[key].title = object.title;
            store.durations[key].duration = object.duration;
        });
        Cookie.set('user_durations', userDurations);
    },

    USER_DURATIONS_RESET(store) {
        const defaultDurations = {};
        _.each(store.durations, (object, key) => {
            defaultDurations[key] = object;
            defaultDurations[key].title = key.replace('_', ' ');
            store.durations[key].title = key.replace('_', ' ');
            store.durations[key].duration = (store.durations[key].defaults.minutes * 60) + store.durations[key].defaults.seconds;
        });
        Cookie.set('user_durations', defaultDurations);
    },

    USER_PREFERENCES_SET(store, payload) {
        const userPreferences = {};
        _.each(payload, (preference, key) => {
            userPreferences[key] = preference.value;
        });
        Cookie.set('user_preferences', userPreferences);
    },

    MODAL_TOGGLE(store) {
        store.app.modal = !store.app.modal;
    },

    TOAST_TRIGGER(store, payload) {
        store.app.toast.message = payload;
        store.app.toast.active = true;
        setTimeout(() => {
            store.app.toast.active = false;
        }, 3000);
    },
};

export default mutations;
