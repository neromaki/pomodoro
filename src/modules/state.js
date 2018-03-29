/**
 * brioche/state
 * Contains the Vuex app state
 */

const state = {
    app: {
        loading: false,
        modal: false,
        toast: {
            active: false,
            message: '',
        },
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
        focus: {
            title: 'focus',
            duration: 0,
            minutes: 0,
            seconds: 0,
            defaults: {
                minutes: 0,
                seconds: 8,
            },
        },
        short_break: {
            title: 'short break',
            duration: 0,
            minutes: 0,
            seconds: 0,
            defaults: {
                minutes: 0,
                seconds: 3,
            },
        },
        long_break: {
            title: 'long break',
            duration: 0,
            minutes: 0,
            seconds: 0,
            defaults: {
                minutes: 0,
                seconds: 8,
            },
        },
    },
    schedule: [],
};

export default state;
