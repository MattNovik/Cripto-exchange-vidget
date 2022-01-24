<template lang='pug'>
.vidget-wrapper.flex.flex-col.justify-center.items-start.max-w-960.w-full
  h2.text-5xl.mb-4 Crypto Exchange
  p.text-xl.mb-16 Exchange fast and easy
  .inputs-wrapper.flex.flex-1.mb-8.gap-x-8.w-full
    .left-input-wrapper.flex.flex-1.w-full.h-15.bg-alice-blue.rounded-md.border-solid.border-pattens-blue.border.relative.box-border
      input(type="number" v-model="firstinput").number.h-15.bg-alice-blue.rounded-md.border-solid.border-pattens-blue.pt-4.pb-4.pl-4.w-full
      <CustomSelectComp v-on:take-name="changeName"/>
    .arrows.flex.flex-col.items-center.justify-center
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z" fill="#11B3FE"/>
      </svg>
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.99 3H16V5H3.99V8L0 4L3.99 0V3Z" fill="#11B3FE"/>
      </svg>
    .right-input-wrapper.flex.flex-1.w-full.h-15.bg-alice-blue.rounded-md.border-solid.border-pattens-blue.border.relative.box-border
      input(:value="estimated").number.h-15.bg-alice-blue.rounded-md.border-solid.border-pattens-blue.pt-4.pb-4.pl-4.w-full
      <CustomSelectComp v-on:take-name-sec="changeSecName"/>
  .address-wrapper.w-full
    p.text-lg.mb-2 Your Ethereum address
    .address-wrapper__input-wrapper.flex.gap-x-8
      input.address-wrapper__input.w-full.h-15.bg-alice-blue.rounded-lg.border-solid.border-pattens-blue.border.p-4
      button.button-error.text-lg.pt-4.pb-4.pl-14.pr-14.bg-deep-sky-blue.text-white.rounded-lg.relative Exchange
        span.button-error__error This pair is disabled now
</template>

<script>
import CustomSelectComp from './CustomSelectComp.vue'
import axios from 'axios'

export default {
  name: 'Vidget',
  components: {
    CustomSelectComp,
  },
  data () {
    return {
      ask: null,
      name: 'btc',
      secondEx: 'btc',
      errored: false,
      estimated: '',
      firstinput: Number,
      minAmount: null,
    }
  },
  watch: {
    firstinput: function(e) {
      this.firstinput = e;
      this.ask = 'https://api.changenow.io/v1/exchange-amount/' + this.firstinput + '/' + this.name + '_' + this.secondEx + '/?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd';
      axios
        .get('https://api.changenow.io/v1/min-amount/' + this.name + '_' + this.secondEx + '?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd')
        .then(response => {
            this.minAmount = response.data.minAmount;
            if (this.firstinput < this.minAmount) {
              this.estimated = '------';
              console.log('not enough');
            } else if (this.minAmount === null) {
              const buttonError = document.querySelector('.button-error');
              if (!buttonError.classList.contains('error')) {
                buttonError.classList.add('error');
              }
              throw new Error('this pair is disabled now');
            } else {
              axios
                .get(this.ask)
                .then(response => {
                  this.estimated = response.data.estimatedAmount;
                  if (this.estimated === null) {
                    const buttonError = document.querySelector('.button-error');
                    if (buttonError.classList.contains('error')) {
                      buttonError.classList.remove('error');
                    }
                    throw new Error('this pair is disabled now');
                  }
                  })
                .catch(() => {
                  this.errored = true;
                })
                .finally(() => {
                });
              }
            })
        .catch(() => {
          const buttonError = document.querySelector('.button-error');
          if (!buttonError.classList.contains('error')) {
            buttonError.classList.add('error');
          }
          this.errored = true;
        })
        .finally(() => {
        });
    },
  },
  methods: {
    changeSecName: function(name) {
      this.secondEx = name.trim();
      axios
        .get('https://api.changenow.io/v1/min-amount/' + this.name + '_' + this.secondEx + '?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd')
        .then(response => {
            this.firstinput = response.data.minAmount;
            })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
        });
    },
    changeName: function(name) {
      this.name = name.trim();
      axios
        .get('https://api.changenow.io/v1/min-amount/' + this.name + '_' + this.secondEx + '?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd')
        .then(response => {
            this.firstinput = response.data.minAmount;
            })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
        });
    },
    change: function() {
    }
  },
  mounted() {

  },
  props: {
  },
}
</script>