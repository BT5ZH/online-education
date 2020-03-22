<template>
  <div id="xyz" class="container">
    <app-header></app-header>
    <app-features></app-features>
    <app-footer></app-footer>
    <app-login></app-login>
    <data-loading :active="isActive" :is-full-screen="true"></data-loading>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
import Header from './Header.vue'
import Features from './Features.vue'
import Footer from './Footer.vue'
import Popup from './Popup.vue'
import VueElementLoading from 'vue-element-loading'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-features': Features,
    'app-footer': Footer,
    'app-login': Popup,
    'data-loading':VueElementLoading
  },
  computed: {
    ...mapState({  //...对象扩展符
                isActive: 'dataLoading'
            })
  },
}
</script>

<style lang="scss">

</style>
