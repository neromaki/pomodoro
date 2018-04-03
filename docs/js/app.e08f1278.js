webpackJsonp([1], {
    "0": function (t, s, e) { t.exports=e("NHnr"); },
    "0KXk": function (t, s, e) { t.exports=`${e.p}pomodoro/img/pomodoro-tomato.921dc69e.svg`; },
    "B+Ey": function (t, s) {},
    "NHnr": function (t, s, e) {
        Object.defineProperty(s, "__esModule", { value: !0 }); let i=e("/5sW"),
            n=e("NYxO"),
            a=(e("bGr6"), e("n12u"), e("lbHh")),
            o=e.n(a),
            r={
                components: {},
                data() { return {}; },
                computed: Object.assign({}, Object(n.b)({
                    timer: "timer", durations: "durations", schedule: "schedule", progressStyle: "progressStyle",
                })),
                methods: { startTimer() { this.$store.dispatch("TIMER_START"); }, stopTimer() { this.$store.dispatch("TIMER_STOP"); }, resetTimer() { this.$store.dispatch("TIMER_RESET"); } },
                created() { o.a.get("user_durations")||(this.$store.dispatch("USER_DURATIONS_RESET"), this.$store.dispatch("USER_DURATIONS_SET", this.durations)); },
                mounted() { this.$store.dispatch("USER_DURATIONS_GET"), this.$store.dispatch("SCHEDULE_CREATE"), this.$store.dispatch("TIMER_INIT"); },
            },
            u=function () {
                let t=this,
                    s=t.$createElement,
                    e=t._self._c||s; return e("div", [e("div", { class: ["pie-wrapper"] }, [e("span", { staticClass: "countdown" }, [t._v(t._s(this.timer.output))]), e("span", { staticClass: "smaller" }, [t._v(t._s(this.timer.current.title))]), e("div", { staticClass: "pie", style: t.progressStyle.pie }, [e("div", { staticClass: "left-side half-circle", style: t.progressStyle.left }), e("div", { staticClass: "right-side half-circle", style: t.progressStyle.right })]), e("div", { staticClass: "shadow" }), e("div", { staticClass: "pie-background" }), e("div", { staticClass: "overlay", class: t.timer.state }, [t.timer.state=="paused"||t.timer.state=="stopped"?e("svg", {
                    staticClass: "controls play",
                    attrs: {
                        version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32",
                    },
                    on: { click(s) { t.startTimer(); } },
                }, [e("title", [t._v("play")]), e("path", { attrs: { d: "M6 4l20 12-20 12z" } })]):t._e(), t.timer.state=="playing"?e("svg", {
                    staticClass: "controls play",
                    attrs: {
                        version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32",
                    },
                    on: { click(s) { t.stopTimer(); } },
                }, [e("title", [t._v("pause")]), e("path", { attrs: { d: "M4 4h10v24h-10zM18 4h10v24h-10z" } })]):t._e(), t.timer.state=="paused"?e("svg", {
                    staticClass: "controls restart",
                    attrs: {
                        version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32",
                    },
                    on: { click(s) { t.resetTimer(); } },
                }, [e("title", [t._v("restart")]), e("path", { attrs: { d: "M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z" } })]):t._e()])])]);
            },
            c=[],
            d=e("XyMi"); function l(t) { e("B+Ey"); } let m=!1,
            p=l,
            h="data-v-1b8e4645",
            E=null,
            T=Object(d.a)(r, u, c, m, p, h, E),
            v=T.exports,
            f={
                computed: Object.assign({}, Object(n.b)({ durations: "durations", modal: "appModal" })),
                data() { return { userDurations: {} }; },
                methods: {
                    saveUserDurations() { const t=this; _.each(this.userDurations, (t) => { t.duration=60*parseInt(t.minutes)+parseInt(t.seconds); }), this.$store.dispatch("USER_DURATIONS_SET", this.userDurations).then((s) => { t.$store.dispatch("SCHEDULE_CREATE"), t.$store.dispatch("TIMER_INIT"), t.$store.dispatch("MODAL_TOGGLE"), t.$store.dispatch("TOAST_TRIGGER", "Timers updated successfully."); }).catch((t) => {}); }, resetDurations(t) { const s=this; t.preventDefault(), this.$store.dispatch("USER_DURATIONS_RESET").then((t) => { s.$store.dispatch("SCHEDULE_CREATE"), s.$store.dispatch("TIMER_INIT"), s.$store.dispatch("MODAL_TOGGLE"), s.$store.dispatch("TOAST_TRIGGER", "Timers reset to defaults."); }); }, validateMinutes(t) { this.userDurations[t].minutes=parseInt(this.userDurations[t].minutes)<0?"0":this.userDurations[t].minutes, this.userDurations[t].minutes=this.userDurations[t].minutes<10&&this.userDurations[t].minutes!=="00"?`0${this.userDurations[t].minutes}`:this.userDurations[t].minutes; }, validateSeconds(t) { this.userDurations[t].seconds=this.userDurations[t].seconds>59?"59":this.userDurations[t].seconds, this.userDurations[t].seconds=this.userDurations[t].seconds<0?0:this.userDurations[t].seconds, this.userDurations[t].seconds=this.userDurations[t].seconds<10&&this.userDurations[t].seconds!=="00"?`0${this.userDurations[t].seconds}`:this.userDurations[t].seconds; }, incrementMinutes(t) { this.userDurations[t].minutes=parseInt(this.userDurations[t].minutes)+1, this.validateMinutes(t); }, decrementMinutes(t) { this.userDurations[t].minutes=parseInt(this.userDurations[t].minutes)-1, this.validateMinutes(t); }, incrementSeconds(t) { this.userDurations[t].seconds=parseInt(this.userDurations[t].seconds)+1, this.validateSeconds(t); }, decrementSeconds(t) { this.userDurations[t].seconds=parseInt(this.userDurations[t].seconds)-1, this.validateSeconds(t); }, toggleModal() { this.$store.dispatch("MODAL_TOGGLE"); },
                },
                created() {
                    this.userDurations=this.durations, _.each(this.userDurations, (t) => {
                        let s=parseInt(t.duration/60, 10),
                            e=parseInt(t.duration%60, 10); t.minutes=s<10?"0".concat(s):s, t.seconds=e<10?"0".concat(e):e;
                    });
                },
                mounted() {},
            },
            R=function () {
                let t=this,
                    s=t.$createElement,
                    e=t._self._c||s; return e("div", [e("div", { staticClass: "settings modal" }, [e("section", { staticClass: "settings__durations" }, [e("h2", [t._v("Customise timers")]), t._l(t.userDurations, (s, i) => e("div", { staticClass: "settings__durations__list" }, [e("input", {
                    directives: [{
                        name: "model", rawName: "v-model", value: s.title, expression: "timer.title",
                    }],
                    attrs: { type: "text", id: "title" },
                    domProps: { value: s.title },
                    on: { input(e) { e.target.composing||t.$set(s, "title", e.target.value); } },
                }), e("div", [e("div", { staticClass: "duration--wrapper" }, [e("input", {
                    directives: [{
                        name: "model", rawName: "v-model", value: s.minutes, expression: "timer.minutes",
                    }],
                    staticClass: "duration--minutes",
                    attrs: { type: "number", min: "0", maxlength: "3" },
                    domProps: { value: s.minutes },
                    on: { blur(s) { t.validateMinutes(i); }, input(e) { e.target.composing||t.$set(s, "minutes", e.target.value); } },
                }), e("button", { staticClass: "increment", attrs: { type: "button" }, on: { click(s) { t.incrementMinutes(i); } } }, [e("svg", {
                    attrs: {
                        version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20",
                    },
                }, [e("path", { attrs: { d: "M15.484 12.452c-0.436 0.446-1.043 0.481-1.576 0l-3.908-3.747-3.908 3.747c-0.533 0.481-1.141 0.446-1.574 0-0.436-0.445-0.408-1.197 0-1.615 0.406-0.418 4.695-4.502 4.695-4.502 0.217-0.223 0.502-0.335 0.787-0.335s0.57 0.112 0.789 0.335c0 0 4.287 4.084 4.695 4.502s0.436 1.17 0 1.615z" } })])]), e("button", { staticClass: "decrement", attrs: { type: "button", maxlength: "2" }, on: { click(s) { t.decrementMinutes(i); } } }, [e("svg", {
                    attrs: {
                        version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20",
                    },
                }, [e("path", { attrs: { d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" } })])])]), e("div", { staticClass: "duration--wrapper" }, [e("input", {
                    directives: [{
                        name: "model", rawName: "v-model", value: s.seconds, expression: "timer.seconds",
                    }],
                    staticClass: "duration--seconds",
                    attrs: { type: "number", min: "0", max: "59" },
                    domProps: { value: s.seconds },
                    on: { blur(s) { t.validateSeconds(i); }, input(e) { e.target.composing||t.$set(s, "seconds", e.target.value); } },
                }), e("button", { staticClass: "increment", attrs: { type: "button" }, on: { click(s) { t.incrementSeconds(i); } } }, [e("svg", {
                    attrs: {
                        version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20",
                    },
                }, [e("path", { attrs: { d: "M15.484 12.452c-0.436 0.446-1.043 0.481-1.576 0l-3.908-3.747-3.908 3.747c-0.533 0.481-1.141 0.446-1.574 0-0.436-0.445-0.408-1.197 0-1.615 0.406-0.418 4.695-4.502 4.695-4.502 0.217-0.223 0.502-0.335 0.787-0.335s0.57 0.112 0.789 0.335c0 0 4.287 4.084 4.695 4.502s0.436 1.17 0 1.615z" } })])]), e("button", { staticClass: "decrement", attrs: { type: "button", maxlength: "2" }, on: { click(s) { t.decrementSeconds(i); } } }, [e("svg", {
                    attrs: {
                        version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20",
                    },
                }, [e("path", { attrs: { d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" } })])])])])])), e("div", [e("button", { staticClass: "save-durations", attrs: { type: "button" }, on: { click(s) { t.saveUserDurations(); } } }, [t._v("save")]), e("a", { attrs: { href: "#" }, on: { click(s) { t.resetDurations(s); } } }, [t._v("reset to defaults")])])], 2)]), this.modal?e("div", { staticClass: "modal-overlay", on: { click(s) { t.toggleModal(); } } }):t._e()]);
            },
            g=[]; function S(t) { e("Sq7x"); } let I=!1,
            D=S,
            M="data-v-6ffd3c4c",
            w=null,
            A=Object(d.a)(f, R, g, I, D, M, w),
            U=A.exports,
            C={
                computed: Object.assign({}, Object(n.b)({ modal: "appModal", toast: "toast" })), components: { Timer: v, Settings: U }, data() { return {}; }, methods: { toggleSettings() { this.$store.dispatch("MODAL_TOGGLE"); } }, created() { this.$store.dispatch("APP_INIT"); },
            },
            O=function () {
                let t=this,
                    s=t.$createElement,
                    e=t._self._c||s; return e("div", [e("div", { class: ["toast", t.toast.active?"active":""] }, [t._v(t._s(t.toast.message))]), e("header", [t._m(0), e("button", { staticClass: "toggle-settings", on: { click(s) { t.toggleSettings(); } } }, [e("svg", {
                    attrs: {
                        version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32",
                    },
                }, [e("title", [t._v("settings")]), e("path", { attrs: { d: "M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z" } })])])]), e("main", [e("timer"), this.modal?e("settings"):t._e()], 1), e("footer")]);
            },
            b=[function () {
                let t=this,
                    s=t.$createElement,
                    i=t._self._c||s; return i("div", { staticClass: "brand" }, [i("img", { staticClass: "logo", attrs: { src: e("0KXk"), alt: "Pomodoro logo" } }), i("h1", [t._v("pomodoro")])]);
            }]; function P(t) { e("RdwL"); } let L=!1,
            N=P,
            y="data-v-24da671d",
            x=null,
            G=Object(d.a)(C, O, b, L, N, y, x),
            $=G.exports,
            k={
                app: { loading: !1, modal: !1, toast: { active: !1, message: "" } },
                timer: {
                    duration: 0, time: "", output: "00:00", percent: 0, state: "stopped", timer: "", current: "",
                },
                progressStyle: { pie: "", left: "", right: "" },
                durations: {
                    focus: {
                        title: "focus", duration: 0, minutes: 0, seconds: 0, defaults: { minutes: 25, seconds: 0 },
                    },
                    short_break: {
                        title: "short break", duration: 0, minutes: 0, seconds: 0, defaults: { minutes: 5, seconds: 0 },
                    },
                    long_break: {
                        title: "long break", duration: 0, minutes: 0, seconds: 0, defaults: { minutes: 15, seconds: 0 },
                    },
                },
                schedule: [],
            },
            H=k,
            j={
                appLoading(t) { return t.app.loading; }, appModal(t) { return t.app.modal; }, timer(t) { return t.timer; }, durations(t) { return t.durations; }, schedule(t) { return t.schedule; }, progressStyle(t) { return t.progressStyle; }, toast(t) { return t.app.toast; },
            },
            z=j,
            B=e("fKPv"),
            Y=e.n(B),
            X={
                APP_INIT(t) { const s=t.commit; s("APP_INIT"); },
                TIMER_INIT(t) {
                    let s=t.commit,
                        e=_.first(V.state.schedule),
                        i=e.duration; s("TIMER_UPDATE", { current: e }), s("TIMER_INIT"); let n=parseInt(V.state.timer.time/60, 10),
                        a=parseInt(V.state.timer.time%60, 10); n=n<10?`0${n}`:n, a=a<10?`0${a}`:a, s("TIMER_UPDATE", { time: Math.round(i), duration: Math.round(i), output: "".concat(n, ":").concat(a) }), s("TIMER_UPDATE_STYLE");
                },
                TIMER_START(t) { const s=t.commit; s("TIMER_UPDATE", { state: "playing" }), V.dispatch("TIMER_STEP"), s("TIMER_CLEAR"), V.state.timer.timer=setInterval(() => { V.dispatch("TIMER_STEP"); }, 1e3); },
                TIMER_STOP(t) { const s=t.commit; s("TIMER_UPDATE", { state: "paused" }), s("TIMER_CLEAR"); },
                TIMER_RESET(t) { const s=t.commit; s("TIMER_UPDATE", { state: "stopped" }), s("TIMER_CLEAR"), V.dispatch("SCHEDULE_CREATE"); const e=_.first(V.state.schedule); V.dispatch("TIMER_INIT", e.duration); },
                TIMER_UPDATE(t, s) { const e=t.commit; e("TIMER_UPDATE", s); },
                TIMER_STEP(t) {
                    let s=t.commit,
                        e=parseInt(V.state.timer.time/60, 10),
                        i=parseInt(V.state.timer.time%60, 10); e=e<10?`0${e}`:e, i=i<10?`0${i}`:i, V.state.timer.time>=0?(s("TIMER_UPDATE", Y()({ output: `${e}:${i}`, percent: 100-V.state.timer.time/V.state.timer.duration*100 }, "output", `${e}:${i}`)), s("TIMER_UPDATE_STYLE"), s("TIMER_UPDATE", { time: V.state.timer.time-1 }), document.title="(".concat(V.state.timer.output, ") - ").concat(V.state.timer.current.title)):V.state.timer.time<=0&&V.dispatch("TIMER_NEXT");
                },
                TIMER_NEXT(t) { const s=t.commit; V.dispatch("PLAY_SOUND"), s("TIMER_CLEAR"), s("SCHEDULE_PULL"); const e=_.first(V.state.schedule); if (e)s("TIMER_UPDATE", { current: e }), V.dispatch("TIMER_INIT", e.duration), V.dispatch("TIMER_START"), s("TIMER_UPDATE", { state: "playing" }); else { s("SCHEDULE_CREATE"); const i=_.first(V.state.schedule); V.dispatch("TIMER_INIT", i.duration), V.dispatch("TIMER_START"), s("TIMER_UPDATE", { current: i, state: "playing" }); } },
                SCHEDULE_CREATE(t) { const s=t.commit; s("SCHEDULE_CREATE"); },
                USER_DURATIONS_GET(t) { const s=t.commit; s("USER_DURATIONS_GET"); },
                USER_DURATIONS_SET(t, s) { const e=t.commit; e("USER_DURATIONS_SET", s); },
                USER_DURATIONS_RESET(t) { const s=t.commit; s("USER_DURATIONS_RESET"); },
                USER_PREFERENCES_SET(t, s) { const e=t.commit; e("USER_PREFERENCES_SET", s); },
                TOAST_TRIGGER(t, s) { const e=t.commit; e("TOAST_TRIGGER", s); },
                PLAY_SOUND(t) { t.commit; const s=new Audio(e("Sn+e")); s.volume=0.4, s.play(); },
                MODAL_TOGGLE(t) { const s=t.commit; V.dispatch("TIMER_STOP"), s("MODAL_TOGGLE"); },
            },
            F=X,
            K=(e("VjuZ"), {
                APP_INIT(t) { _.each(t.durations, (t, s) => { t.minutes=t.defaults.minutes, t.seconds=t.defaults.seconds; }); }, TIMER_INIT(t) { t.timer.duration=0, t.timer.time="", t.timer.output="00:00", t.timer.percent=0, t.timer.state="stopped", t.timer.timer=""; }, TIMER_UPDATE(t, s) { _.each(s, (s, e) => { t.timer[e]=s; }); }, TIMER_CLEAR(t, s) { window.clearInterval(t.timer.timer), document.title="pomodoro"; }, TIMER_UPDATE_STYLE(t) { t.progressStyle.pie=t.timer.percent>50?"clip: rect(auto, auto, auto, auto);":"", t.progressStyle.left=`transform: rotate(${3.6*t.timer.percent}deg);`, t.progressStyle.right=t.timer.percent<50?"display: none;":"transform: rotate(180deg);"; }, SCHEDULE_CREATE(t) { t.schedule=[t.durations.focus, t.durations.short_break, t.durations.focus, t.durations.short_break, t.durations.focus, t.durations.long_break]; }, SCHEDULE_PULL(t) { _.pullAt(t.schedule, 0); }, USER_DURATIONS_GET(t) { const s=o.a.getJSON("user_durations"); _.each(s, (s, e) => { t.durations[e].title=s.title, t.durations[e].duration=s.duration; }); }, USER_DURATIONS_SET(t, s) { const e={}; _.each(s, (s, i) => { e[i]=s, t.durations[i].title=s.title, t.durations[i].duration=s.duration; }), o.a.set("user_durations", e); }, USER_DURATIONS_RESET(t) { const s={}; _.each(t.durations, (e, i) => { s[i]=e, s[i].title=i.replace("_", " "), t.durations[i].title=i.replace("_", " "), t.durations[i].duration=60*t.durations[i].defaults.minutes+t.durations[i].defaults.seconds; }), o.a.set("user_durations", s); }, USER_PREFERENCES_SET(t, s) { const e={}; _.each(s, (t, s) => { e[s]=t.value; }), o.a.set("user_preferences", e); }, MODAL_TOGGLE(t) { t.app.modal=!t.app.modal; }, TOAST_TRIGGER(t, s) { t.app.toast.message=s, t.app.toast.active=!0, setTimeout(() => { t.app.toast.active=!1; }, 3e3); },
            }),
            q=K; i.a.use(n.a); var J=new n.a.Store({
                state: H, getters: z, actions: F, mutations: q,
            }),
            V=J; i.a.use(n.a), window._=e("M4fF"), window.debug_mode=!0, window.log=function (t) { window.debug_mode&&console.log(t); }; new i.a({
            store: V, el: "#app", components: { App: $ }, methods: {}, render(t) { return t($); },
        });
    },
    "RdwL": function (t, s) {},
    "Sn+e": function (t, s, e) { t.exports=`${e.p}media/glass-bell.863559b1.mp3`; },
    "Sq7x": function (t, s) {},
}, [0]);
// # sourceMappingURL=app.e08f1278.js.map
