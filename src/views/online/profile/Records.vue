<template>
    <div class="records">
        <div class="re__courses" @click="showMyCourses()">
            <div class="re__courses--box">
                <input v-model="courseName" type="text" placeholder="我的课程" name="course" id="course">
                <svg>
                    <use xlink:href="../../../assets/img/all.svg#icon-chevron-down"></use>
                </svg>
            </div>
            <div class="re__courses--list" v-show="boxShow">
                <ul>
                    <li @click="getCourseName(course)" v-for="(course,index) in courses" :key="index">
                        {{course.COURSE_NAME}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="re__detail">
            <div class="re__detail__list">
                <ul class="re__detail__list__nav">
                    <li class="re__detail__list__nav__item" v-for="(lesson,index) in progress" :key="index">
                        
                        <div class="re__detail__list__nav__item__circle">
                            <div class="re__detail__list__nav__item__circle--1"></div>
                            <div class="re__detail__list__nav__item__circle--2"></div>
                            <div class="re__detail__list__nav__item__circle--3">
                                <span>{{lesson.number}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                boxShow: false,
                progress:[
                    {number:15},
                    {number:15},
                    {number:15},
                    {number:15},
                ],
                courseName: ""
            }
        },
        computed: {
            courses(){
                return this.$store.state.myCoursesShortList;
            }

        },
        created:function() {
            this.$store.dispatch("getMyCourses").then(() => {
                console.log("获取自选课程成功");
            }).catch((err) => {
                console.error(err);
            });
        },
        methods: {
            showMyCourses: function () {
                this.boxShow = !this.boxShow;
            },
            getCourseName: function (course) {
                event.stopPropagation();
                this.courseName = course.COURSE_NAME;
                this.boxShow = false;
            }
        },
    }
</script>