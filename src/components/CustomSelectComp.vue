<template>
<div class="search-wrapper box-border">
  <button  v-on:click="openSearch" class="search-wrapper__opener uppercase flex items-center justify-center min-w-150 gap-x-3 h-full">
    <img :src="image" alt="option.name">
    {{ name }}  
  </button>
  <label class="search-wrapper__label" >
    <span class="search-wrapper__close" v-on:click="closeLabel"></span>
    <input type="text" class="search-wrapper__input p-4 text-bali-hai bg-alice-blue" placeholder="Search" v-model="search">
  </label>
  <ul class="search-wrapper__list bg-alice-blue">
    <li @click="chooseItem" v-for="option in options" class="search-wrapper__item p-4 flex gap-x-4" tabindex="0" :key="option.ticker">
      <img :src="option.image" alt="option.name">
      <span class="uppercase">
        {{ option.ticker }}
      </span>
      <span class="text-bali-hai">
        {{ option.name }}
      </span>
    </li> 
  </ul>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CustomSelectComp',
  data () {
    return {
      errored: false,
      image: null,
      name: null,
      options: null,
      search: '',
      list: null
    }
  },
  methods: {
    closeLabel: function(e) {
      if (e.target.closest('.search-wrapper__label').closest('.search-wrapper').closest('.right-input-wrapper')) {
        const wrapper = e.target.closest('.search-wrapper__label').closest('.search-wrapper').closest('.right-input-wrapper');
        wrapper.classList.remove('border-top');
      } else {
        const wrapper = e.target.closest('.search-wrapper__label').closest('.search-wrapper').closest('.left-input-wrapper');
        wrapper.classList.remove('border-top');
      }
      const searchWrapper = e.target.closest('.search-wrapper__label').closest('.search-wrapper');
      const searchInput = searchWrapper.querySelector('.search-wrapper__input');
      const searchList = searchWrapper.querySelector('.search-wrapper__list');
      const searchLabel = searchWrapper.querySelector('.search-wrapper__label');
      const searchOpener = searchWrapper.querySelector('.search-wrapper__opener');
      searchWrapper.classList.remove('open');
      searchLabel.classList.remove('open');
      searchList.classList.remove('open');
      searchInput.classList.remove('open');
      searchOpener.classList.remove('close');
      
    },
    openSearch: function(e) {
      if (e.target.closest('.search-wrapper').closest('.right-input-wrapper')) {
        const wrapper = e.target.closest('.search-wrapper').closest('.right-input-wrapper');
        wrapper.classList.add('border-top');
      } else {
        const wrapper = e.target.closest('.search-wrapper').closest('.left-input-wrapper');
        wrapper.classList.add('border-top');
      }
      const searchWrapper = e.target.closest('.search-wrapper');
      const searchInput = searchWrapper.querySelector('.search-wrapper__input');
      const searchList = searchWrapper.querySelector('.search-wrapper__list');
      const searchLabel = searchWrapper.querySelector('.search-wrapper__label');
      searchWrapper.classList.add('open');
      searchLabel.classList.add('open');
      searchInput.focus();
      searchList.classList.add('open');
      searchInput.classList.add('open');
      e.target.classList.add('close');
    },
    closeList: function(e) {
      if (e.target.closest('.search-wrapper__list').closest('.search-wrapper').closest('.right-input-wrapper')) {
        const wrapper = e.target.closest('.search-wrapper__list').closest('.search-wrapper').closest('.right-input-wrapper');
        wrapper.classList.remove('border-top');
      } else {
        const wrapper = e.target.closest('.search-wrapper__list').closest('.search-wrapper').closest('.left-input-wrapper');
        wrapper.classList.remove('border-top');
      }
      const searchWrapper = e.target.closest('.search-wrapper__list').closest('.search-wrapper');
      const searchInput = searchWrapper.querySelector('.search-wrapper__input');
      const searchList = searchWrapper.querySelector('.search-wrapper__list');
      const searchLabel = searchWrapper.querySelector('.search-wrapper__label');
      const searchOpener = searchWrapper.querySelector('.search-wrapper__opener');
      searchWrapper.classList.remove('open');
      searchLabel.classList.remove('open');
      searchList.classList.remove('open');
      searchInput.classList.remove('open');
      searchOpener.classList.remove('close');
    },
    chooseItem: function(e) {
      const imageElem = e.target.querySelector('img');
      if (imageElem) {
        this.image = imageElem.getAttribute('src');
      }
      const nameElem = e.target.querySelector('span:first-of-type');
      if (nameElem) {
        this.name = nameElem.innerHTML;
      }
      this.$emit('take-name', this.name);
      this.$emit('take-name-sec',this.name);
      this.closeList(e);
    },
  },
  watch: {
    search: function(e) {
      let valueElem = e;
      let newList = this.list.filter(function (el) {
        return el.name.toLowerCase().includes(valueElem);
      });
      this.options = newList.slice(0,3);
    }
  },
  computed: {
  },
  created() {
    
  },
  mounted() {
    axios
      .get('https://api.changenow.io/v1/currencies?active=true&fixedRate=true')
      .then(response => (
        this.firstElem = response.data[0],
        this.label = this.firstElem.ticker,
        this.name = this.firstElem.ticker,
        this.image = this.firstElem.image,
        this.list = response.data,
        this.options = this.list.slice(1,4),
        this.options.forEach((item) => {
          item.ariaSelected = false;
        }),
        this.options[0].ariaSelected = true
        ))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => {
      });
  }
}
</script>