/**
 * brioche/actions
 * Contains all the Vuex actions for the app
 */

// import Cookie from 'js-cookie';
import store from './store';

// All of the app's actions
const actions = {
    APP_INIT({ commit }) {
        commit('APP_INIT');
    },

    TIMER_INIT({ commit }) {
        const first = _.first(store.state.schedule);
        const { duration } = first;
        commit('TIMER_UPDATE', {
            current: first,
        });
        commit('TIMER_INIT');

        let minutes = parseInt(store.state.timer.time / 60, 10);
        let seconds = parseInt(store.state.timer.time % 60, 10);
        // eslint-disable-next-line
        minutes = minutes < 10 ? "0" + minutes : minutes;
        // eslint-disable-next-line
        seconds = seconds < 10 ? "0" + seconds : seconds;

        commit('TIMER_UPDATE', {
            time: Math.round(duration),
            duration: Math.round(duration),
            output: `${minutes}:${seconds}`,
        });
        commit('TIMER_UPDATE_STYLE');
    },

    TIMER_START({ commit }) {
        commit('TIMER_UPDATE', {
            state: 'playing',
        });

        store.dispatch("TIMER_STEP");
        commit('TIMER_CLEAR');
        store.state.timer.timer = setInterval(() => {
            store.dispatch("TIMER_STEP");
        }, 1000);
    },

    TIMER_STOP({ commit }) {
        commit('TIMER_UPDATE', {
            state: 'paused',
        });
        commit('TIMER_CLEAR');
    },

    TIMER_RESET({ commit }) {
        commit('TIMER_UPDATE', {
            state: 'stopped',
        });
        commit('TIMER_CLEAR');
        store.dispatch('SCHEDULE_CREATE');
        const first = _.first(store.state.schedule);
        store.dispatch('TIMER_INIT', first.duration);
    },

    TIMER_UPDATE({ commit }, payload) {
        commit('TIMER_UPDATE', payload);
    },

    TIMER_STEP({ commit }) {
        let minutes = parseInt(store.state.timer.time / 60, 10);
        let seconds = parseInt(store.state.timer.time % 60, 10);

        // eslint-disable-next-line
        minutes = minutes < 10 ? "0" + minutes : minutes;
        // eslint-disable-next-line
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // eslint-disable-next-line
        if (store.state.timer.time >= 0) {
            commit('TIMER_UPDATE', {
                // eslint-disable-next-line
                output:  minutes + ":" + seconds,
                percent: 100 - ((store.state.timer.time / (store.state.timer.duration)) * 100),
                // eslint-disable-next-line
                output:  minutes + ":" + seconds,
            });
            commit('TIMER_UPDATE_STYLE');
            commit('TIMER_UPDATE', {
                time: store.state.timer.time - 1,
            });
        } else if (store.state.timer.time <= 0) {
            store.dispatch('TIMER_NEXT');
        }
    },

    TIMER_NEXT({ commit }) {
        store.dispatch('PLAY_SOUND');
        commit('TIMER_CLEAR');
        commit('SCHEDULE_PULL');
        const next = _.first(store.state.schedule);
        if (next) {
            commit('TIMER_UPDATE', {
                current: next,
            });
            store.dispatch('TIMER_INIT', next.duration);
            store.dispatch('TIMER_START');
            commit('TIMER_UPDATE', {
                state: 'playing',
            });
        } else {
            commit('SCHEDULE_CREATE');
            const first = _.first(store.state.schedule);
            store.dispatch('TIMER_INIT', first.duration);
            store.dispatch('TIMER_START');
            commit('TIMER_UPDATE', {
                current: first,
                state: 'playing',
            });
        }
    },

    SCHEDULE_CREATE({ commit }) {
        commit('SCHEDULE_CREATE');
    },

    USER_DURATIONS_GET({ commit }) {
        commit('USER_DURATIONS_GET');
    },

    USER_DURATIONS_SET({ commit }, payload) {
        commit('USER_DURATIONS_SET', payload);
    },

    USER_DURATIONS_RESET({ commit }) {
        commit('USER_DURATIONS_RESET');
    },

    USER_PREFERENCES_SET({ commit }, payload) {
        commit('USER_PREFERENCES_SET', payload);
    },

    TOAST_TRIGGER({ commit }, payload) {
        commit('TOAST_TRIGGER', payload);
    },

    PLAY_SOUND({ commit }) {
        // eslint-disable-next-line
        const audio = new Audio(require('../assets/glass-bell.mp3'));
        audio.volume = 0.4;
        audio.play();
    },

    MODAL_TOGGLE({ commit }) {
        store.dispatch('TIMER_STOP');
        commit('MODAL_TOGGLE');
    },
};

export default actions;
