<template>
    <div>
        <div class="settings modal">
            <section class="settings__durations">
                <h2>Customise timers</h2>
                <div class="settings__durations__list" v-for="(timer, key) in userDurations">
                    <input type="text" id="title" v-model="timer.title" />
                    <div>
                        <div class="duration--wrapper">
                            <input type="number" class="duration--minutes" min="0" maxlength="3" v-model="timer.minutes" @blur="validateMinutes(key)" />
                            <button type="button" class="increment" @click="incrementMinutes(key)">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path d="M15.484 12.452c-0.436 0.446-1.043 0.481-1.576 0l-3.908-3.747-3.908 3.747c-0.533 0.481-1.141 0.446-1.574 0-0.436-0.445-0.408-1.197 0-1.615 0.406-0.418 4.695-4.502 4.695-4.502 0.217-0.223 0.502-0.335 0.787-0.335s0.57 0.112 0.789 0.335c0 0 4.287 4.084 4.695 4.502s0.436 1.17 0 1.615z"></path>
                                </svg>
                            </button>
                            <button type="button" class="decrement" maxlength="2" @click="decrementMinutes(key)">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="duration--wrapper">
                            <input type="number" class="duration--seconds" v-model="timer.seconds" min="0" max="59" @blur="validateSeconds(key)" />
                            <button type="button" class="increment" @click="incrementSeconds(key)">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path d="M15.484 12.452c-0.436 0.446-1.043 0.481-1.576 0l-3.908-3.747-3.908 3.747c-0.533 0.481-1.141 0.446-1.574 0-0.436-0.445-0.408-1.197 0-1.615 0.406-0.418 4.695-4.502 4.695-4.502 0.217-0.223 0.502-0.335 0.787-0.335s0.57 0.112 0.789 0.335c0 0 4.287 4.084 4.695 4.502s0.436 1.17 0 1.615z"></path>
                                </svg>
                            </button>
                            <button type="button" class="decrement" maxlength="2" @click="decrementSeconds(key)">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" class="save-durations" @click="saveUserDurations()">save</button>
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
                timer.duration = (parseInt(timer.minutes) * 60) + parseInt(timer.seconds);
            });
            this.$store.dispatch('USER_DURATIONS_SET', this.userDurations)
                .then((r) => {
                    this.$store.dispatch('SCHEDULE_CREATE');
                    this.$store.dispatch('TIMER_INIT');
                    this.$store.dispatch('MODAL_TOGGLE');
                    this.$store.dispatch('TOAST_TRIGGER', 'Timers updated successfully.');
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
                    this.$store.dispatch('TOAST_TRIGGER', 'Timers reset to defaults.');
                });
        },
        validateMinutes(key) {
            this.userDurations[key].minutes = (parseInt(this.userDurations[key].minutes) < 0 ? "0" : this.userDurations[key].minutes);
            // eslint-disable-next-line
            this.userDurations[key].minutes = this.userDurations[key].minutes < 10 && this.userDurations[key].minutes !== '00' ? '0' + this.userDurations[key].minutes : this.userDurations[key].minutes;
        },
        validateSeconds(key) {
            this.userDurations[key].seconds = (this.userDurations[key].seconds > 59 ? "59" : this.userDurations[key].seconds);
            this.userDurations[key].seconds = (this.userDurations[key].seconds < 0 ? 0 : this.userDurations[key].seconds);
            // eslint-disable-next-line
            this.userDurations[key].seconds = this.userDurations[key].seconds < 10 && this.userDurations[key].seconds !== '00' ? '0' + this.userDurations[key].seconds : this.userDurations[key].seconds;
        },
        incrementMinutes(key) {
            this.userDurations[key].minutes = (parseInt(this.userDurations[key].minutes) + 1);
            this.validateMinutes(key);
        },
        decrementMinutes(key) {
            this.userDurations[key].minutes = (parseInt(this.userDurations[key].minutes) - 1);
            this.validateMinutes(key);
        },
        incrementSeconds(key) {
            this.userDurations[key].seconds = (parseInt(this.userDurations[key].seconds) + 1);
            this.validateSeconds(key);
        },
        decrementSeconds(key) {
            this.userDurations[key].seconds = (parseInt(this.userDurations[key].seconds) - 1);
            this.validateSeconds(key);
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
$red: #CC6449;
$red-dark: #B9615B;
$blue: #46aae0;
$blue-dark: #5b9ec2;

    .save-durations {
        background: $blue;
        color: white;
        border: none;
        font-size: .9em;
        padding: 10px 40px;
        box-shadow: 0 4px 0 darken($blue, 8%);
        cursor: pointer;
        font-size: 1em;
        border-radius: 3px;

        @media screen and (max-width: 550px) {
            margin-bottom: 35px;
        }

        &:hover {
            background: darken($blue, 5%);
        }
    }

    .modal {
        z-index: 8;
        position: relative;
        background: white;
        padding: 20px 25px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @media screen and (max-width: 550px) {
            position: absolute;
            top: 30px;
            transform: translate(-50%, 0);
            margin-bottom: 30px;
        }

        &.active {
            display: block;
        }

        section {
            h1,
            h2 {
                margin-top: 0;
            }

            a {
                &:visited {
                    color: lighten(black, 20%);
                }
            }

            &.settings__durations {
                > div {
                    display: flex;

                    &:last-child {
                        justify-content: space-between;
                        align-items: center;
                    }

                    > div {
                        display: flex;
                    }

                    @media screen and (max-width: 550px) {
                        flex-direction: column;
                    }

                    > input {
                        @media screen and (max-width: 550px) {
                            margin-bottom: 10px;
                        }
                    }
                }
            }

            .duration--wrapper {
                position: relative;
                &:first-child {
                    margin-right: 10px;
                }

                button {
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: 6px 4px;
                    background: $red;
                    border: none;
                    outline: none;
                    cursor: pointer;

                    &:hover,
                    &:focus
                    &:active {
                        outline: none;
                    }

                    &:hover,
                    &:active {
                        background: darken($red, 5%);
                    }

                    &.increment {
                        padding: 5px 4px;
                        border-top-right-radius: 5px;
                        border-bottom: 1px solid $red-dark;
                        z-index: 1;
                        &:active {
                            top: 1px;
                        }
                    }
                    &.decrement {
                        z-index: 2;
                        top: initial;
                        bottom: 0;
                        border: none;
                        padding-bottom: 4px;
                        border-bottom: 4px solid $red-dark;
                        border-bottom-right-radius: 5px;
                        &:active {
                            bottom: -1px;
                        }
                    }

                    svg {
                        fill: white;
                    }
                }
            }

            .settings__durations__list {
                margin-bottom: 15px;

                @media screen and (max-width: 550px) {
                    margin-bottom: 35px;
                }

                input {
                    padding: 10px 15px;
                    font-size: 1em;
                    border: none;
                    box-shadow: 0px 2px 0 rgba(0, 0, 0, 0.2) inset;
                    border-radius: 5px;
                    background: darken(white, 5%);
                }

                > input {
                    margin-right: 25px;

                    @media screen and (max-width: 550px) {
                        margin-right: 0;
                    }
                }

                .duration--minutes,
                .duration--seconds {
                    width: 70px;
                    position: relative;
                    font-size: 2em;
                    padding: 15px 25px 15px 15px;
                    appearance: textfield;
                    &::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                    }
                }

                .duration--seconds {
                    width: 50px;
                }
            }
        }
    }

    .modal-overlay {
        z-index: 7;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .75);
    }

    @keyframes toast-cycle {

    }
</style>
