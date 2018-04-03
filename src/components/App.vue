<template>
    <div>
        <div :class="['toast', (toast.active ? 'active' : '')]">{{ toast.message }}</div>
        <header>
            <div class="brand">
                <img src="../assets/images/pomodoro-tomato.svg" class="logo" alt="Pomodoro logo" />
                <h1>pomodoro</h1>
            </div>

            <button class="toggle-settings" @click="toggleSettings()">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>settings</title>
                    <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"></path>
                </svg>
            </button>
        </header>

        <main>
            <timer></timer>
            <settings v-if="this.modal"></settings>
        </main>

        <footer>
        </footer>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import 'promise-polyfill/src/polyfill';
import { mapGetters } from 'vuex';
// import { Telegram } from '../modules/telegram';
import Timer from './Timer.vue';
import Settings from './Settings.vue';

export default {
    computed: {
        ...mapGetters({
            modal: 'appModal',
            toast: 'toast',
        }),
    },
    components: {
        Timer,
        Settings,
    },
    data() {
        return {};
    },
    methods: {
        toggleSettings() {
            this.$store.dispatch('MODAL_TOGGLE');
        },
    },
    created() {
        this.$store.dispatch('APP_INIT');
    },
};
</script>

<style lang="scss" scoped>
    .toast {
        background: #bbf5bb;
        position: fixed;
        top: -100%;
        left: 50%;
        z-index: 10;
        color: hsla(120, 74%, 35%, 1);
        padding: 40px 20px 10px;
        transform: translate(-50%, 0);
        transition: top cubic-bezier(0.42, 0, 0.15, 1.36) .4s;

        &.active {
            top: -30px;
        }
    }

    main {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    header {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 10px 20px;
        background: white;
        border-top: 4px solid #dc775e;
        z-index: 5;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);

        @media(min-width: 1200px) {
            padding: 10px 30px;
        }
        .logo {
            width: 50px;
            height: 50px;
        }

        .brand {
            display: flex;
            align-items: center;
        }

        h1 {
            font-family: Lato, sans-serif;
            font-weight: 400;
            font-size: 2em;
            color: lighten(#000, 15%);
            margin-left: 15px;
            position: relative;
            top: -4px;
        }

        .toggle-settings {
            background: none;
            border: none;
            cursor: pointer;
            svg {
                transition: transform ease-out .15s;
                fill: lighten(black, 15%);
            }

            &:hover,
            &:focus
            &:active {
                background: none;
                border: none;
                outline: none;

                svg {
                    transform: rotateZ(90deg);
                }
            }
        }
    }
</style>
