<template>
    <div>
        <div :class="['pie-wrapper']">
          <span class="countdown">{{ this.timer.output }}</span>
          <span class="smaller">pomodoro</span>

          <div class="pie" :style="progressStyle.pie">
            <div class="left-side half-circle" :style="progressStyle.left"></div>
            <div class="right-side half-circle" :style="progressStyle.right"></div>
          </div>
          <div class="shadow"></div>
          <div class="overlay"></div>
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
            },
            progressStyle: {
                pie: '',
                left: '',
                right: '',
            },
        };
    },
    methods: {
        startTimer(duration) {
            this.timer.time = duration * 60;
            this.timer.duration = duration;
            // eslint-disable-next-line
            this.timer.output = duration + ":00";

            this.stepTimer();
            setInterval(() => {
                this.stepTimer();
            }, 1000);
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
                this.timer.percent = 100 - ((this.timer.time / (this.timer.duration * 60)) * 100);


                this.progressStyle.pie = (this.timer.percent > 50 ? 'clip: rect(auto, auto, auto, auto);' : '');
                // eslint-disable-next-line
                this.progressStyle.left = 'transform: rotate('+ (this.timer.percent * 3.6) +'deg);';
                this.progressStyle.right = (this.timer.percent < 50 ? 'display: none;' : 'transform: rotate(180deg);');
                this.timer.time--;
            }
        }
    },
    created() {},
    mounted() {
        this.startTimer(1);
    },
};
</script>

<style lang="scss" scoped>
    $pie-color: red;

    @mixin size($w, $h){
      height: $h;
      width: $w;
    }

    // --
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }


    .set-size {
      font-size: 10em;
    }

    $size: 30em;

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
    }
</style>
