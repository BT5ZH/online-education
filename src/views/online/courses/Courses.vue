<template>
    <main class="rs-courses">
        <div class="courses-list">
            <div v-for="(course,index) in allTreasure" :key="index" class="course" @click="startToLearn(index)">
                <img :src="course.COURSE_COVERURL" :alt="course.COURSE_NAME"
                    class="course__img">
                <svg class="course__like">
                    <use xlink:href="../../../assets/img/all.svg#icon-heart-full"></use>
                </svg>
                <h5 class="course__name">{{course.COURSE_NAME}}</h5>
                <!-- <div class="course__title">
                    {{course.COURSE_NAME}}
                </div> -->
                <div class="course__author">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-eye"></use>
                    </svg>
                    <span>{{course.COURSE_AUTHORNAME}}</span>
                </div>
                <div class="course__student">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-users"></use>
                    </svg>
                    <span>{{course.COURSE_STUDENTS}}</span>
                </div>
                <div class="course__rank">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-star"></use>
                    </svg>
                    <span>{{course.COURSE_RANK}}</span>
                </div>
                <div class="course__price">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-key"></use>
                    </svg>
                    <span>FREE</span>
                </div>
                <!-- <button class="online-btn">
                    <router-link :to="{name:'learning',params:{courseId:course.COURSE_ID}}">开始学习</router-link>
                </button> -->
            </div>
        </div>
    </main>
</template>
<style>
    .test {
        background-image: url("../../../assets/img/all.svg#icon-heart-full");
    }
</style>
<script>
    export default {
        data() {
            return {
                activeClass: 'rs__card--edit',
                resList: this.$store.state.resourceList,
                pinshow: false
            }
        },
        computed: {
            allTreasure() {
                return this.$store.state.courseAllList;
            }
        },
        created() {
            this.$store.dispatch("getAllCourses").then(() => {
                console.log("-----------");
            }).catch((err) => {
                console.error(err);
            });
        },
        methods: {
            getLinkAddress:function(index){
                let link = "/learning/";
                let temp = link+this.allTreasure[index].COURSE_ID
                return temp;
            },
            startToLearn:function(index){
                this.$router.push({name:'learning',params:{courseId:this.allTreasure[index].COURSE_ID}})
            }
        },
    }
</script>