<template>
    <div>
        <div :class="['pie-wrapper']">
          <span class="countdown">{{ this.timer.output }}</span>
          <span class="smaller">{{ this.timer.current.title }}</span>

          <div class="pie" :style="progressStyle.pie">
            <div class="left-side half-circle" :style="progressStyle.left"></div>
            <div class="right-side half-circle" :style="progressStyle.right"></div>
          </div>
          <div class="shadow"></div>
          <div class="pie-background"></div>
          <div class="overlay" :class="timer.state">

              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="controls play" v-if="timer.state == 'paused' || timer.state == 'stopped'" @click="startTimer()">
                  <title>play</title>
                  <path d="M6 4l20 12-20 12z"></path>
              </svg>

              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="controls play" v-if="timer.state == 'playing'" @click="stopTimer()">
                  <title>pause</title>
                  <path d="M4 4h10v24h-10zM18 4h10v24h-10z"></path>
              </svg>

              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="controls restart" v-if="timer.state == 'paused'" @click="resetTimer()">
                  <title>restart</title>
                  <path d="M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z"></path>
              </svg>

          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { Telegram } from '../modules/telegram';
import Cookie from 'js-cookie';

export default {
    components: {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            timer: 'timer',
            durations: 'durations',
            schedule: 'schedule',
            progressStyle: 'progressStyle',
        }),
    },
    methods: {
        startTimer() {
            this.$store.dispatch('TIMER_START');
        },

        stopTimer() {
            this.$store.dispatch('TIMER_STOP');
        },

        resetTimer() {
            this.$store.dispatch('TIMER_RESET');
        },
    },
    created() {
        if (!Cookie.get('user_durations')) {
            this.$store.dispatch('USER_DURATIONS_SET', this.durations);
        }
    },
    mounted() {
        this.$store.dispatch('USER_DURATIONS_GET');
        this.$store.dispatch('SCHEDULE_CREATE');
        this.$store.dispatch('TIMER_INIT');
    },
};
</script>

<style lang="scss" scoped>
    $pie-color: #dd785f;
    $size: 40em;
    $size_tab: $size / 1.5;
    $size_mob: $size / 1.75;

    @mixin size($w, $h){
      height: $h;
      width: $w;
    }

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    .set-size {
      font-size: 10em;
    }

    .pie-wrapper {
      @include size($size, $size);
      $progress-division: 25; // Bigger number == thinner circle

      margin: 0 auto;
      position: relative;

      @media screen and (max-height: 750px), screen and (max-width: 720px) {
          @include size($size_tab, $size_tab);
      }

      @media screen and (max-height: 550px), screen and (max-width: 470px) {
            @include size($size_mob, $size_mob);
      }

      &:nth-child(3n+1) {
        clear: both;
      }

      .pie {
        @include size(100%, 100%);
        clip: rect(0, $size, $size, $size / 2);
        left: 0;
        position: absolute;
        top: 0;

        @media screen and (max-height: 750px), screen and (max-width: 720px) {
            @include size($size_tab, $size_tab);
            clip: rect(0, $size_tab, $size_tab, $size_tab / 2);
        }

        @media screen and (max-height: 550px), screen and (max-width: 470px) {
            @include size($size_mob, $size_mob);
            clip: rect(0, $size_mob, $size_mob, $size_mob / 2);
        }

        .half-circle {
          @include size(100%, 100%);
          border: $size / $progress-division solid $pie-color;
          border-radius: 50%;
          clip: rect(0, $size / 2, $size, 0);
          left: 0;
          position: absolute;
          top: 0;
          // transition: transform ease-in-out .2s;

          @media screen and (max-height: 750px), screen and (max-width: 720px) {
              border: $size_tab / $progress-division solid $pie-color;
              clip: rect(0, $size_tab / 2, $size_tab, 0);
          }

          @media screen and (max-height: 550px), screen and (max-width: 470px) {
              border: $size_mob / $progress-division solid $pie-color;
              clip: rect(0, $size_mob / 2, $size_mob, 0);
          }
        }
      }

      .countdown {
        $font-size: $size / 4;
        $font-size-redo: $size * 4;

        cursor: default;
        color: #626e6f;
        display: block;
        font-family: 'Lato', sans-serif;
        font-size: $font-size;
        left: 50%;
        line-height: $font-size;
        position: absolute;
        text-align: center;
        top: 46%;
        transform: translate(-50%, -50%);
        z-index: 1;

        @media screen and (max-height: 750px), screen and (max-width: 720px) {
            font-size: $font-size / 1.5;
            line-height: $font-size / 1.5;
        }
        @media screen and (max-height: 550px), screen and (max-width: 470px) {
            font-size: $font-size / 1.75;
            line-height: $font-size / 1.75;
        }
      }

      .smaller {
        color: #7f8c8d;
        font-family: 'Raleway', sans-serif;
        font-size: $size / 22;
        padding-bottom: 20px;
        left: 50%;
        top: 71%;
        width: 10em;
        position: absolute;
        text-align: center;
        display: block;
        transform: translate(-50%, -50%);
        z-index: 1;

        @media screen and (max-height: 750px), screen and (max-width: 720px) {
            font-size: $size / 25;
        }
        @media screen and (max-height: 550px), screen and (max-width: 470px) {
            font-size: $size / 27;
        }
      }

      .shadow {
        @include size(100%, 100%);
        border: $size / $progress-division solid rgba(237, 237, 237, .75);
        border-radius: 50%;
        @media screen and (max-height: 750px), screen and (max-width: 720px) {
            border: $size_tab / $progress-division solid rgba(237, 237, 237, .75);
        }
        @media screen and (max-height: 550px), screen and (max-width: 470px) {
            border: $size_mob / $progress-division solid rgba(237, 237, 237, .75);
        }
      }

      .pie-background {
        height: calc(100% - 2.4em);
        width: calc(100% - 2.4em);
        border-radius: 50%;
        position: absolute;
        top: 1.2em;
        left: 1.2em;
        background: rgba(255, 255, 255, .95);
        z-index: 0;
    }

      .overlay {
        height: calc(100% - 2.4em);
        width: calc(100% - 2.4em);
        border-radius: 50%;
        position: absolute;
        top: 1.2em;
        left: 1.2em;
        background: rgba(0, 0, 0, .5);
        transition: background ease-in-out .1s;
        z-index: 2;

        &:hover {
            background: rgba(0, 0, 0, .4);
        }

        &.playing {
            opacity: 0;
            transition: opacity ease-in-out .1s;

            &:hover {
                opacity: .5;
            }
        }

        svg {
            $ctrl-size: 10em;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: $ctrl-size;
            height: $ctrl-size;
            fill: white;
            cursor: pointer;

            &.play {
                transform: translate(-42%, -50%);
            }

            &.restart {
                top: initial;
                bottom: 10%;
                width: $ctrl-size / 3;
                height: $ctrl-size / 3;
            }
        }
      }
    }
</style>
