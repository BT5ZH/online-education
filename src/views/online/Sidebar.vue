<template>
    <nav class="rs-sidebar">
        <ul class="side-nav">
            <li :class="[currentPage=='/'?activeClass:'','side-nav__item']" >
                <router-link class="side-nav__link" to="/" >
                <!-- <a href="#" class="side-nav__link"> -->
                    <svg class="side-nav__icon">
                        <use xlink:href="../../assets/img/sprite.svg#icon-key"></use>
                    </svg>
                    <span>所有课程</span>
                </router-link>
            <li  :class="[currentPage.includes('learning')?activeClass:'','side-nav__item']">
                <router-link class="side-nav__link" to="/learning">
                    <svg class="side-nav__icon">
                        <use xlink:href="../../assets/img/sprite2.svg#icon-aircraft-take-off"></use>
                    </svg>

                    <span>正在学习</span>
                </router-link>
            </li>
            <li :class="[currentPage.includes('upload')?activeClass:'','side-nav__item']">
                <router-link class="side-nav__link" to="/upload">
                    <svg class="side-nav__icon">
                        <use xlink:href="../../assets/img/sprite2.svg#icon-info"></use>
                    </svg>
                    <span>资源上传</span>
                </router-link>
            </li>
            <li  :class="[currentPage.includes('cook')?activeClass:'','side-nav__item']">
                <router-link class="side-nav__link" to="/cook-top">
                    <svg class="side-nav__icon">
                        <use xlink:href="../../assets/img/sprite2.svg#icon-aircraft-take-off"></use>
                    </svg>

                    <span>课程创建</span>
                </router-link>
            </li>
            <li class="side-nav__item">
                <router-link class="side-nav__link" to="">
                    <svg class="side-nav__icon">
                        <use xlink:href="../../assets/img/sprite2.svg#icon-map"></use>
                    </svg>
                    <span>个人中心</span>
                </router-link>
            </li>
        </ul>
        <!-- current:-{{currentPage}}- -->
        <div class="legal">
            &copy; 2017 by trillo. All rights reserved.
        </div>
    </nav>
</template>

<script>
export default {
    data: function() {
        return {
            flag: 'router-link-exact-active',
            isA: true,
            activeClass: 'side-nav__item--active',
        }
    },
    computed: {
        currentPage(){
            return this.$route.path;
        }
    },
    methods: {
        isActive:function(){
            if(this.flag=='router-link-exact-active'){
                this.isA=true;
            }else {
                this.isA= false;
            }
            return this.isA;
        }
    },
    
}
</script>
<style lang="scss">
    .active{
        background-color: red;
    }
</style>