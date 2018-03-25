/**
 * brioche/state
 * Contains the Vuex app state
 */

const state = {
    app: {
        loading: false,
        modal: true,
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
            duration: 0,
            default: 5,
        },
        short_break: {
            title: 'short break',
            duration: 0,
            default: 10,
        },
        long_break: {
            title: 'long break',
            duration: 0,
            default: 20,
        },
    },
    schedule: [],
};

export default state;
