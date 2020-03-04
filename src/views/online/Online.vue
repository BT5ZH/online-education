<template>
    <div id="online" class="rs-online" >
        <online-header></online-header>
        <div class="rs-content">
            <side-bar></side-bar>
            <router-view></router-view>
            <!-- <online-courses v-if="show"></online-courses>
            <online-learning v-if="show"></online-learning>
            <online-upload v-if="!show"></online-upload> -->
        </div>
    </div>
</template>

<script>
    import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
    import Header from './Header.vue'
    import Sidebar from './Sidebar.vue'
    // import Courses from './courses/Courses.vue'
    // import Learning from './learning/Learning.vue'
    // import Upload from './upload/Upload.vue'
    export default {
        name: "online",
        data: function() {
            return {
                show: false,
            }
        },
        components: {
            'online-header': Header,
            'side-bar': Sidebar,
            // 'online-courses': Courses,
            // 'online-learning': Learning,
            // 'online-upload': Upload
        },
        // beforeRouteEnter (to, from, next) {
            // if(true){
            //     next();
            // }else{
            //     next(false);
            // }
        // }
    }
</script>
<style lang="scss">
/* .test {
    color: red;
} */
</style>

