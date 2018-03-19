<template>
    <div>
        <header>
            <div class="brand">
                <img src="../assets/images/pomodoro-tomato.svg" class="logo" alt="Pomodoro logo" />
                <h1>pomodoro</h1>
            </div>
        </header>

        <main>
            <router-view></router-view>
        </main>

        <footer>
        </footer>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import 'promise-polyfill/src/polyfill';
// import { Telegram } from '../modules/telegram';
import Timer from './Timer.vue';

export default {

    components: {
        Timer,
    },
    data() {
        return {};
    },
    methods: {},
    created() {},
};
</script>

<style lang="scss" scoped>
    header {
        @media(min-width: 1200px) {
            padding: 0 20px;
        }
        .logo {
            width: 60px;
            height: 60px;
        }

        .brand {
            display: flex;
            align-items: center;
        }

        h1 {
            font-family: Lato, sans-serif;
            font-size: 2em;
            color: lighten(#000, 15%);
            margin-left: 15px;
            position: relative;
            top: -4px;
        }
    }
</style>
