<template>
  <div id="app" class="flex flex-col justify-center items-center min-h-screen font-volkorn">
    <Vidget/>
  </div>
</template>

<script>
import Vidget from './components/Vidget.vue'

export default {
  name: 'App',
  components: {
    Vidget
  },
  mounted() {
    document.addEventListener('click', this.closeElems);
  },
  methods: {
    closeElems: function(e) {
      if (!e.target.closest('.search-wrapper')) {
          const searchWrapperTopRight = document.querySelector('.right-input-wrapper');
          const searchWrapperTopLeft = document.querySelector('.left-input-wrapper');
          searchWrapperTopRight.classList.remove('border-top');
          searchWrapperTopLeft.classList.remove('border-top');
          const searchWrapper = document.querySelectorAll('.search-wrapper');
          searchWrapper.forEach((elem) => {
          const searchInput = elem.querySelector('.search-wrapper__input');
          const searchList = elem.querySelector('.search-wrapper__list');
          const searchLabel = elem.querySelector('.search-wrapper__label');
          const searchOpener = elem.querySelector('.search-wrapper__opener');
          elem.classList.remove('open');
          searchLabel.classList.remove('open');
          searchList.classList.remove('open');
          searchInput.classList.remove('open');
          searchOpener.classList.remove('close');
        });
      }
    },
  }
}
</script>