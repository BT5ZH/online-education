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
                <img :src="user.AVATAR" alt="User photo" class="user-nav__user-photo">
                <span class="user-nav__user-name">{{user.NAME}}</span>
            </div>
        </nav>

    </header>

</template>
<script>
    export default {
        data() {
            return {
                platformIcon: "../../assets/img/favicon.png",
                publicPath: process.env.BASE_URL
            }
        },
        computed: {
            user() {
                return this.$store.state.userProfile;
            },
            
        },
        created() {

        },
        methods: {
            profileInfo: function () {
                location.href = "#popup"
            },
            learningClean: function () {


            },
            signout: function () {

                let currentPath = this.$route.name;
                let cleanData = {};
                switch (currentPath) {
                    case "courses":
                        //清理工作
                        setTimeout(() => {
                            window.location.href = "index.html";
                        }, 3000);
                        console.log("退出全部课程  " + currentPath);
                        break;
                    case "enrolled":
                        //清理工作
                        setTimeout(() => {
                            window.location.href = "index.html";
                        }, 3000);
                        console.log("退出统计  " + currentPath);
                        break;
                    case "learning":
                        //清理工作

                        cleanData = {
                            data: {
                                learningDetail: this.$store.state.currentActivity,
                                learningProgress: this.$store.state.courseLearningStatus,
                            },
                            courseId: this.$route.params.courseId
                        };
                        this.$store.dispatch("submitLearningActivityInfo", cleanData).then((res) => {
                            if (res == "rs-120") {
                                console.log(res);
                                console.log("学习页面退出");
                                document.getElementById('user-video').pause();
                                window.location.href = "index.html";
                            }
                        }).catch((err) => {
                            console.error(err);

                        });
                        console.log("退出学习  " + currentPath);
                        break;
                    case "myCourses":
                        //清理工作
                        setTimeout(() => {
                            window.location.href = "index.html";
                        }, 3000);
                        console.log("退出我的课程  " + currentPath);
                        break;
                    case "cookFirst":
                        //清理工作
                        setTimeout(() => {
                            window.location.href = "index.html";
                        }, 3000);
                        console.log("退出创建课程  " + currentPath);
                        break;
                    case "editCourse":
                        //清理工作
                        setTimeout(() => {
                            window.location.href = "index.html";
                        }, 3000);
                        console.log("退出编辑课程  " + currentPath);
                        break;
                    default:
                        break;
                }



                this.$store.dispatch("signout").then(() => {
                    console.log("登出成功");

                    // window.location.href = "index.html";

                }).catch((err) => {
                    console.error(err);
                });
            }
        },
    }
</script>