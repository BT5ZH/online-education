<template>
  <div id="xyz" class="container">

    <app-header></app-header>
    <app-features></app-features>
    <app-footer></app-footer>
    <app-login></app-login>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
import Header from './Header.vue'
import Features from './Features.vue'
import Footer from './Footer.vue'
import Popup from './Popup.vue'

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-features': Features,
    'app-footer': Footer,
    'app-login': Popup
  }
}
</script>

<style lang="scss">

</style>
