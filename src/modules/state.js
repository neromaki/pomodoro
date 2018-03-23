/**
 * brioche/state
 * Contains the Vuex app state
 */

const state = {
    app: {
        loading: false,
    },
    timer: {
        duration: 0,
        time: '',
        output: '00:00',
        percent: 0,
        state: 'stopped',
        timer: '',
        current: '',
    },
    progressStyle: {
        pie: '',
        left: '',
        right: '',
    },
    durations: {
        pomodoro: {
            title: 'pomodoro',
            duration: 2,
        },
        short_break: {
            title: 'short break',
            duration: 1,
        },
        long_break: {
            title: 'long break',
            duration: 3,
        },
    },
    schedule: [],
};

export default state;
