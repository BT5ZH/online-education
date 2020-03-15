<template>
    <main class="rs-courses">
        <div class="courses-list">
            <div v-for="(course,index) in allTreasure" :key="index" class="course">
                <img :src="course.COURSE_COVERURL" :alt="course.COURSE_NAME" class="course__img">
                <svg class="course__like" @click="selectToLearn(index)">
                    <use xlink:href="../../../assets/img/all.svg#icon-heart-outlined"></use>
                </svg>
                <h5 class="course__name" @click="startToLearn(index)">{{course.COURSE_NAME}}</h5>

                <!-- <div class="course__author">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-eye"></use>
                    </svg>
                    <span>{{course.COURSE_AUTHORNAME}}</span>
                </div> -->
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
            getLinkAddress: function (index) {
                let link = "/learning/";
                let temp = link + this.allTreasure[index].COURSE_ID
                return temp;
            },
            startToLearn: function (index) {
                this.$router.push({ name: 'learning', params: { courseId: this.allTreasure[index].COURSE_ID } })
            },
            selectToLearn: function (index) {
                let payload = {
                    courseId: this.allTreasure[index].COURSE_ID,
                    courseName: this.allTreasure[index].COURSE_NAME,
                    courseStatus: this.allTreasure[index].COURSE_STATUS,
                    coverUrl: this.allTreasure[index].COURSE_COVERURL,
                    authorId: this.allTreasure[index].AUTHOR_ID
                }
                console.log("-------------->");
                console.log(payload)
                this.$store.dispatch("selectToLearn", payload).then(() => {
                    console.log("-----------");
                }).catch((err) => {
                    console.error(err);
                });
            }
        },
    }
</script>