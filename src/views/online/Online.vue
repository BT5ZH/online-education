<template>
    <div id="online" class="rs-online">
        <online-header></online-header>
        <profile-info></profile-info>
        <div class="rs-content">
            <side-bar></side-bar>
            <router-view></router-view>
        </div>
        <data-loading :active="isActive" :is-full-screen="true" spinner="bar-fade-scale" color="#FF6700"></data-loading>
    </div>
</template>

<script>
    import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
    import Header from './Header.vue'
    import Sidebar from './Sidebar.vue'
    import Popup from './Popup.vue'
    import VueElementLoading from 'vue-element-loading'
    import { mapState } from 'vuex'
    export default {
        name: "online",
        data: function () {
            return {
                show: false,
            }
        },
        computed: {
            ...mapState({  //...对象扩展符
                isActive: 'dataLoading'
            })
        },
        components: {
            'online-header': Header,
            'side-bar': Sidebar,
            'profile-info': Popup,
            'data-loading': VueElementLoading
            // 'online-courses': Courses,
            // 'online-learning': Learning,
            // 'online-upload': Upload
        },
    }
</script>
<style lang="scss">
    /* .test {
    color: red;
} */
</style>