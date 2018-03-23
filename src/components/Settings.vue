<template>
    <div class="settings modal">
        <div>
            <section class="settings__durations">
                <h2>Customise timers</h2>
                <div v-for="timer in userDurations">
                    <div>
                        <label for="title-pomodoro">title</label>
                        <input type="text" id="title-pomodoro" v-model="timer.title" />
                    </div>
                    <div>
                        <label for="duration-pomodoro">duration</label>
                        <input type="text" id="duration-pomodoro" v-model="timer.duration" />
                    </div>
                </div>
                <button type="button" name="save-durations" @click="saveUserDurations()">save</button>
            </section>
        </div>
    </div>
</template>

<script>
// TODO: why the fuck aren't I using vuex
import Cookie from 'js-cookie';
import { mapGetters } from 'vuex';
import { Telegram } from '../modules/telegram';

export default {
    computed: {
        ...mapGetters({
            durations: 'durations',
        }),
    },
    data() {
        return {
            userDurations: {},
        };
    },
    methods: {
        saveUserDurations() {
            this.$store.dispatch('USER_DURATIONS_SET', this.userDurations);
        }
    },
    created() {
        this.userDurations = this.durations;
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
