<template>
    <div>
        <div class="settings modal">
            <section class="settings__durations">
                <h2>Customise timers</h2>
                <div>
                    <label>title</label>
                    <label>duration</label>
                </div>
                <div class="settings__durations__list" v-for="(timer, key) in userDurations">
                    <input type="text" id="title" v-model="timer.title" />
                    <div>
                        <input type="number" class="duration--minutes" v-model="timer.minutes" />
                        <input type="number" class="duration--seconds" v-model="timer.seconds" max="59" @blur="validateSeconds(key)" />
                    </div>
                </div>
                <div>
                    <button type="button" name="save-durations" @click="saveUserDurations()">save</button>
                    <a href="#" @click="resetDurations($event)">reset to defaults</a>
                </div>
            </section>
        </div>
        <div class="modal-overlay" v-if="this.modal" @click="toggleModal()"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { Telegram } from '../modules/telegram';

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
            _.each(this.userDurations, (timer) => {
                timer.duration = (timer.minutes * 60) + timer.seconds;
            });
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
                });
        },
        validateSeconds(key) {
            console.log(this.userDurations[key].seconds, this.userDurations[key].seconds > 59);
            this.userDurations[key].seconds = (this.userDurations[key].seconds > 59 ? "59" : this.userDurations[key].seconds);
        },
        toggleModal() {
            this.$store.dispatch('MODAL_TOGGLE');
        },
    },
    created() {
        this.userDurations = this.durations;
        _.each(this.userDurations, (object) => {
            const minutes = parseInt(object.duration / 60, 10);
            const seconds = parseInt(object.duration % 60, 10);
            object.minutes = minutes < 10 ? `0${minutes}` : minutes;
            object.seconds = seconds < 10 ? `0${seconds}` : seconds;
        });
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
            h1,
            h2 {
                margin-top: 0;
            }

            &.settings__durations {
                > div {
                    display: flex;

                    &:nth-child(2),
                    &:last-child {
                        justify-content: space-between;
                    }

                    > div {
                        display: flex;
                    }
                }
            }

            .settings__durations__list {
                .duration--minutes,
                .duration--seconds {
                    width: 30px;
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
