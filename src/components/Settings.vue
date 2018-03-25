<template>
    <div>
        <div class="settings modal">
            <section class="settings__durations">
                <h2>Customise timers</h2>
                <div>
                    <label>title</label>
                    <label>duration</label>
                </div>
                <div v-for="timer in userDurations">
                    <input type="text" id="title-pomodoro" v-model="timer.title" />
                    <div>
                        <input type="text" id="duration-pomodoro" v-model="timer.duration" />
                    </div>
                </div>
                <div>
                    <button type="button" name="save-durations" @click="saveUserDurations()">save</button>
                    <a href="#" @click="resetDurations($event   )">reset to defaults</a>
                </div>
            </section>
        </div>
        <div class="modal-overlay" v-if="this.modal" @click="toggleModal()"></div>
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
            modal: 'appModal',
        }),
    },
    data() {
        return {
            userDurations: {},
        };
    },
    methods: {
        saveUserDurations() {
            this.$store.dispatch('USER_DURATIONS_SET', this.userDurations)
            .then((r) => {
                this.$store.dispatch('SCHEDULE_CREATE');
                this.$store.dispatch('TIMER_INIT');
                this.$store.dispatch('MODAL_TOGGLE');
            })
            .catch((e) => {
                // TODO: add fail condition
            });
        },
        resetDurations(e) {
            e.preventDefault();
            this.$store.dispatch('USER_DURATIONS_RESET')
            .then((r) => {
                this.$store.dispatch('SCHEDULE_CREATE');
                this.$store.dispatch('TIMER_INIT');
                this.$store.dispatch('MODAL_TOGGLE');
            })
        },
        toggleModal() {
            this.$store.dispatch('MODAL_TOGGLE');
        },
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
        z-index: 1;
        position: relative;
        background: white;
        padding: 20px 25px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        &.active {
            display: block;
        }

        section {
            &.settings__durations {
                > div {
                    display: flex;

                    &:first-child,
                    &:last-child {
                        justify-content: space-between;
                    }

                    > div {
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }

    .modal-overlay {
        z-index: 0;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .75);
    }
</style>
