<template>
    <div>
        <header>
        </header>

        <main>
            <router-view></router-view>
        </main>

        <footer>
        </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Telegram } from '../modules/telegram';

export default {

    components: {},
    computed: mapGetters({
        authCheck: 'authToken',
    }),
    data() {
        return {};
    },
    methods: {},
    created() {
        this.$store.dispatch('AUTH_LOGIN', { email: process.env.API_DEFAULT_USER, password: process.env.API_DEFAULT_PASS })
            .then((r) => {
                if (!this.authCheck) {
                    console.log("No auth!");
                    return;
                }
                // Emit an event on our seperate event bus Telegram
                Telegram.$emit('authed', true);
            })
            .catch((e) => {
                console.log("Issue logging in");
                console.log(e);
            });
    },
};
</script>
