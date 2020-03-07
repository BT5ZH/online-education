<template>
    <main class="rs-courses">
        <div class="courses-list">
            <div v-for="(course,index) in allTreasure" :key="index" class="course">
                <img :src="allTreasure[index].COURSE_COVERURL" :alt="allTreasure[index].COURSE_NAME" class="course__img">
                <svg class="course__like">
                    <use xlink:href="../../../assets/img/all.svg#icon-heart-full"></use>
                </svg>
                <h5 class="course__name">{{allTreasure[index].COURSE_STATUS}}</h5>
                <div class="course__title">
                    {{allTreasure[index].COURSE_NAME}}
                </div>
                <div class="course__author">
                    <span>{{allTreasure[index].COURSE_AUTHORNAME}}</span>
                </div>
                <div class="course__student">
                    <span>{{allTreasure[index].COURSE_STUDENTS}}</span>
                </div>
                <div class="course__rank">
                    <span>{{allTreasure[index].COURSE_RANK}}</span>
                </div>
                <div class="course__price">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-key"></use>
                    </svg>
                    <span>FREE</span>
                </div>
                <button class="online-btn course__btn">
                    <router-link to="/learning">开始学习</router-link>
                </button>
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
    }
</script>