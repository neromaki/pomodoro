<template>
    <div>
        Timer

        <div :class="['pie-wrapper']">
          <span class="countdown">{{ this.timer }}</span>
          <span class="smaller">pomodoro</span>

          <div class="pie" :style="progressStyle.pie">
            <div class="left-side half-circle" :style="progressStyle.left"></div>
            <div class="right-side half-circle" :style="progressStyle.right"></div>
          </div>
          <div class="shadow"></div>
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
            timer: '00:00',
            timerPercent: 0,
            progressStyle: {
                pie: '',
                left: '',
                right: ''
            },
        };
    },
    methods: {
        startTimer(duration) {
            let timer = duration * 60;
            // eslint-disable-next-line
            this.timer = duration + ":00";
            const that = this;

            setInterval(() => {
                let minutes = parseInt(timer / 60, 10);
                let seconds = parseInt(timer % 60, 10);

                // eslint-disable-next-line
                minutes = minutes < 10 ? "0" + minutes : minutes;
                // eslint-disable-next-line
                seconds = seconds < 10 ? "0" + seconds : seconds;

                // eslint-disable-next-line
                if (--timer >= 0) {
                    // eslint-disable-next-line
                    that.timer = minutes + ":" + seconds;
                    that.timerPercent = 100 - ((timer / (duration * 60)) * 100);

                    that.progressStyle.pie = (this.timerPercent > 50 ? 'clip: rect(auto, auto, auto, auto);' : '');
                    // eslint-disable-next-line
                    that.progressStyle.left = 'transform: rotate('+ (this.timerPercent * 3.6) +'deg);';
                    that.progressStyle.right = (this.timerPercent < 50 ? 'display: none;' : 'transform: rotate(180deg);');
                }
            }, 1000);
        },
    },
    created() {},
    mounted() {
        this.startTimer(25);
    },
};
</script>

<style lang="scss" scoped>
    $pie-color: red;

    @mixin draw-progress-less-than-fifty($progress, $color) {
        .pie {
            .half-circle {
                border-color: $color;
            }

            .left-side {
                $rotate: $progress * 3.6;
                transform: rotate(#{$rotate}deg);
            }

            .right-side {
                display: none;
            }
        }
    }

    @mixin draw-progress-more-than-fifty($progress, $color) {
        .pie {
            clip: rect(auto, auto, auto, auto);

            .half-circle {
                border-color: $color;
            }

            .left-side {
                $rotate: $progress * 3.6;
                transform: rotate(#{$rotate}deg);
            }

            .right-side {
                transform: rotate(180deg);
            }
        }
    }

    @mixin draw-progress($progress, $color) {
      .pie {
        .half-circle {
          border-color: $color;
        }

        .left-side {
          $rotate: $progress * 3.6;
          transform: rotate('${rotate}deg');
        }
      }
    }

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

    $percentage: 1;
    @while $percentage <= 50 {
        .progress-#{$percentage} {
            @include draw-progress-less-than-fifty($percentage, $pie-color);
        }
        $percentage: $percentage + 1;
    }

    $percentage: 51;
    @while $percentage <= 100 {
        .progress-#{$percentage} {
            @include draw-progress-more-than-fifty($percentage, $pie-color);
        }
        $percentage: $percentage + 1;
    }
</style>
