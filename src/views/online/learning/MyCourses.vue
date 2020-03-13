<template>
    <main class="rs-myCourses">
        <div class="myCourses__area">
            <div class="myCourses__area__card">
                <li class="myCourses__area__card--add" >
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-book"></use>
                    </svg>
                </li>
                <div class="myCourses__area__card--title">
                    您一共收藏了 XX 门课程
                </div>
            </div>
            <div v-for = "(course,index) in courseList" :key="index" class="myCourses__area__card">
                <img :src="courseList[index].COURSE_COVERURL" alt="House 3" class="myCourses__area__card--img">
                <h5 class="myCourses__area__card--name">{{courseList[index].COURSE_STATUS}}</h5>
                <div class="myCourses__area__card--title">
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
                return this.$store.state.myCoursesShortList;
            }

        },
        mounted() {
            
        },
        created() {
            this.$store.dispatch("getMyCourses").then(() => {
                console.log("-----------");
            }).catch((err) => {
                console.error(err);
            });
        }
    }
</script>