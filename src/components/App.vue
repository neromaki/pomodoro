<template>
    <div>
        <header>
            Pomodoro
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
