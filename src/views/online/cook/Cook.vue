<template>
    <main class="rs-cooking">
        <div class="cooking-area">
            <div class="cooking-card">
                <router-link class="cooking-card__add" to="/cook-template">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-plus"></use>
                    </svg>
                </router-link>
                <div class="cooking-card__title">
                    点“+”号，创建课程
                </div>
            </div>
            <div v-for = "(course,index) in courseList" :key="index" class="cooking-card">
                <img :src="courseList[index].COURSE_COVERURL" alt="House 3" class="cooking-card__img">
                <h5 class="cooking-card__name">{{courseList[index].COURSE_STATUS}}</h5>
                <div class="cooking-card__title">
                    {{courseList[index].COURSE_NAME}}
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        computed: {
            courseList(){
                return this.$store.state.courseShortList;
            }

        },
        created() {
            this.$store.dispatch("getUserCourses").then(() => {
                console.log("-----------");
            }).catch((err) => {
                console.error(err);
            });

        },
        methods: {
            goDetail() {

            }
        },
    }
</script>