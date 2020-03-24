<template>
    <header class="online">
        <a href="index.html" class="online__icon">
            <img src="../../assets/img/favicon.png" alt="rs logo" class="online__logo">
        </a>
        <form action="#" class="search">
            <input type="text" class="search__input" placeholder="Search Courses">
                <button class="search__button">
                    <svg class="search__icon">
                        <use xlink:href="../../assets/img/all.svg#icon-magnifying-glass"></use>
                    </svg>
                </button>
        </form>
        <nav class="user-nav">
            <div class="user-nav__icon-box">
                <svg class="user-nav__icon">
                    <use xlink:href="../../assets/img/all.svg#icon-bookmark"></use>
                </svg>
                <span class="user-nav__notification">6</span>
            </div>
            <div class="user-nav__icon-box">
                <svg class="user-nav__icon">
                    <use xlink:href="../../assets/img/all.svg#icon-chat"></use>
                </svg>
                <span class="user-nav__notification">90</span>
            </div>
            <div class="user-nav__icon-box" @click="signout">
                <svg class="user-nav__icon">
                    <use xlink:href="../../assets/img/all.svg#icon-exit"></use>
                </svg>
            </div>
            <div class="user-nav__user" @click="profileInfo">
                <img :src="avatar" alt="User photo" class="user-nav__user-photo">
                <span class="user-nav__user-name">张汇泉</span>
            </div>
        </nav>
        
    </header>
    
</template>
<script>
export default {
    data() {
        return {
            platformIcon:"../../assets/img/favicon.png",
            publicPath: process.env.BASE_URL
        }
    },
    computed: {
        avatar(){
            return this.$store.state.userProfile.AVATAR;
        }
    },
    created() {
        
    },
    methods: {
        profileInfo:function(){
            location.href="#popup"
        },
        signout:function(){

            this.$store.dispatch("signout").then(() => {
                    console.log("登出成功");
                    window.location.href = "index.html";
                }).catch((err) => {
                    console.error(err);
                });
        }
    },
}
</script>