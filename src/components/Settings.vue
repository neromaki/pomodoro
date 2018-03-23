<template>
    <div class="settings modal">
        <div>
            <section class="settings__durations">
                <h2>Customise timers</h2>
                <div v-for="timer in durations">
                    <div>
                        <label for="title-pomodoro">title</label>
                        <input type="text" id="title-pomodoro" v-model="timer.title" />
                    </div>
                    <div>
                        <label for="duration-pomodoro">duration</label>
                        <input type="text" id="duration-pomodoro" v-model="timer.duration" />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
// TODO: why the fuck aren't I using vuex
import Cookie from 'js-cookie';
import { Telegram } from '../modules/telegram';

export default {
    components: {},
    data() {
        return {
            durations: {}
        };
    },

    methods: {
        getUserDurations() {
            const userDurations = Cookie.getJSON('user_durations');
            console.log(userDurations);
            _.each(userDurations, (object, key) => {
                this.durations[key].title = object.title;
                this.durations[key].duration = object.duration;
            });
        },

        setUserDurations(durations) {
            const userDurations = {};
            _.each(durations, (object, key) => {
                userDurations[key] = object;
            });

            Cookie.set('user_durations', userDurations);
        },
    },
    created() {
        this.setUserDurations(this.durations);
        this.getUserDurations(this.durations);
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
    .modal {
        // display: none;

        &.active {
            display: block;
        }

        section {
            &.settings__durations {
                > div {
                    display: flex;

                    > div {
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }
</style>
