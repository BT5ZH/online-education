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
                    您一共收藏了 <span style="font-size: 2.8rem;color:goldenrod">{{courseList.length}}</span> 门课程
                </div>
            </div>
            <div v-for = "(course,index) in courseList" :key="index" class="myCourses__area__card" @click="startToLearn(index)">
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
        },
        methods: {
            startToLearn:function(index){
                console.log("8888"+this.courseList[index].COURSE_ID)
                console.log("8888"+this.courseList[index].AUTHOR_ID)
                this.$router.push({name:'learning',
                    params:{
                        courseId:this.courseList[index].COURSE_ID,
                        authorId:this.courseList[index].AUTHOR_ID
                    }
                });
            }
        },
    }
</script>