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
// import { mapGetters } from 'vuex';
// import { Telegram } from '../modules/telegram';

export default {
    components: {},
    data() {
        return {
            timer: {
                duration: 0,
                time: '',
                output: '00:00',
                percent: 0,
                state: 'stopped',
                timer: '',
                current: '',
            },
            progressStyle: {
                pie: '',
                left: '',
                right: '',
            },
            durations: {
                pomodoro: {
                    title: 'pomodoro',
                    duration: 5,
                },
                short_break: {
                    title: 'short break',
                    duration: 5 * 60,
                },
                long_break: {
                    title: 'long break',
                    duration: 15 * 60,
                },
                transition: {
                    title: 'transition',
                    duration: 2 * 60,
                },
            },
            schedule: [],
        };
    },
    methods: {
        initTimer(duration) {
            this.timer.duration = 0;
            this.timer.time = '';
            this.timer.output = '00:00';
            this.timer.percent = 0;
            this.timer.state = 'stopped';
            this.timer.timer = '';

            this.timer.time = Math.round(duration);
            this.timer.duration = Math.round(duration);
            let minutes = parseInt(this.timer.time / 60, 10);
            let seconds = parseInt(this.timer.time % 60, 10);
            // eslint-disable-next-line
            minutes = minutes < 10 ? "0" + minutes : minutes;
            // eslint-disable-next-line
            seconds = seconds < 10 ? "0" + seconds : seconds;
            // eslint-disable-next-line
            this.timer.output = minutes + ":" + seconds;
            this.updateTimerStyle();
        },

        startTimer() {
            this.timer.state = 'playing';
            this.stepTimer();
            this.timer.timer = setInterval(() => {
                this.stepTimer();
            }, 1000);
        },

        stopTimer() {
            this.timer.state = 'paused';
            window.clearInterval(this.timer.timer);
        },

        resetTimer() {
            this.timer.state = 'stopped';
            window.clearInterval(this.timer.timer);
            this.createSchedule();
            const first = _.first(this.schedule);
            this.initTimer(first.duration);
        },

        stepTimer() {
            let minutes = parseInt(this.timer.time / 60, 10);
            let seconds = parseInt(this.timer.time % 60, 10);

            // eslint-disable-next-line
            minutes = minutes < 10 ? "0" + minutes : minutes;
            // eslint-disable-next-line
            seconds = seconds < 10 ? "0" + seconds : seconds;

            // eslint-disable-next-line
            if (this.timer.time >= 0) {
                // eslint-disable-next-line
                this.timer.output = minutes + ":" + seconds;
                this.timer.percent = 100 - ((this.timer.time / (this.timer.duration)) * 100);
                this.updateTimerStyle();
                this.timer.time = this.timer.time - 1;
            } else if (this.timer.time <= 0) {
                this.nextTimer();
            }
        },

        nextTimer() {
            window.clearInterval(this.timer.timer);
            _.pullAt(this.schedule, 0);
            const next = _.first(this.schedule);
            if (next) {
                this.timer.current = next;
                this.initTimer(next.duration);
                this.startTimer();
                this.timer.state = 'playing';
            }
        },

        updateTimerStyle() {
            this.progressStyle.pie = (this.timer.percent > 50 ? 'clip: rect(auto, auto, auto, auto);' : '');
            // eslint-disable-next-line
            this.progressStyle.left = 'transform: rotate('+ (this.timer.percent * 3.6) +'deg);';
            this.progressStyle.right = (this.timer.percent < 50 ? 'display: none;' : 'transform: rotate(180deg);');
        },

        createSchedule() {
            this.schedule = [this.durations.pomodoro, this.durations.short_break];
        },
    },
    created() {
        this.createSchedule();
    },
    mounted() {
        const first = _.first(this.schedule);
        this.timer.current = first;
        this.initTimer(first.duration);
    },
};
</script>

<style lang="scss" scoped>
    $pie-color: #dd785f;
    $size: 30em;

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

      &:nth-child(3n+1) {
        clear: both;
      }

      .pie {
        @include size(100%, 100%);
        clip: rect(0, $size, $size, $size / 2);
        left: 0;
        position: absolute;
        top: 0;

        .half-circle {
          @include size(100%, 100%);
          border: $size / $progress-division solid $pie-color;
          border-radius: 50%;
          clip: rect(0, $size / 2, $size, 0);
          left: 0;
          position: absolute;
          top: 0;
          // transition: transform ease-in-out .2s;
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
      }

      .shadow {
        @include size(100%, 100%);
        border: $size / $progress-division solid #f7f8f8;
        border-radius: 50%;
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
