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
        <div v-if="courseName" class="re__infoCard">
            <div class="re__infoCard__start">
                <div class="re__infoCard__start__icon">
                    <div class="re__infoCard__start__icon--txt">S</div>
                </div>
                <div v-if="cardStartTime" class="re__infoCard__start__text">
                    {{timeStampFormatS }}
                </div>
                <div v-if="!cardStartTime" class="re__infoCard__start__text">
                    开始时间
                </div>
            </div>
            <div class="re__infoCard__end">
                <div class="re__infoCard__end__icon">
                    <div class="re__infoCard__end__icon--txt">E</div>
                </div>
                <div v-if="cardEndTime" class="re__infoCard__end__text">
                    {{timeStampFormatE}}
                </div>
                <div v-if="!cardEndTime" class="re__infoCard__end__text">
                    结束时间
                </div>
            </div>
            <div class="re__infoCard__duration">
                <div class="re__infoCard__end__icon">
                    <div class="re__infoCard__end__icon--txt">D</div>
                </div>
                <div v-if="cardDuration" class="re__infoCard__end__text">
                    {{timeFormat}}
                </div>
                <div v-if="!cardDuration" class="re__infoCard__end__text">
                    视频时长
                </div>
            </div>
            <div class="re__infoCard__pro">
                <div class="re__infoCard__pro__txt">
                    {{timeProgress}}%
                </div>
            </div>
        </div>
        <div class="re__detail">
            <div v-if="currentCourse.length" class="re__detail__list">
                <ul class="re__detail__list__nav">
                    <li class="re__detail__list__nav__item" v-for="(lesson,index) in currentCourse" :key="index"
                        :style="{'background-color':lesson.backColor}">
                        <div class="re__detail__list__nav__item__circle" 
                            :style="{'background-color':lesson.color}"
                            @click="showDetail(index)">
                            <div class="re__detail__list__nav__item__circle--1"
                                :style="{'transform':lesson.progressShow}"></div>
                            <div class="re__detail__list__nav__item__circle--2"
                                :style="{'background-color':lesson.greenColor,'z-index':lesson.zindex}"></div>
                            <div class="re__detail__list__nav__item__circle--3">
                                <span v-if="lesson.progress">{{lesson.progress}}%</span>
                                <svg v-if="!lesson.progress">
                                    <use xlink:href="../../../assets/img/all.svg#icon-book"></use>
                                </svg>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- {'background-color':lesson.progress<50?'#6ed4bf':'#ffffff'} -->
            <div v-if="!currentCourse.length" class="re__detail__blank">
                请选择课程
            </div>
        </div>
    </div>
</template>
<script>
    import {timeConvert,timeStampConvert} from '../../../js/utils';
    export default {
        data: function () {
            return {
                boxShow: false,
                test: timeConvert(1000),
                courseName: "",
                currentCourseName: "",
                currentCourseId: "",
                currentCourse: [],
                currentCourseNumber: 0,
                currentCourseAuthorId: "",

                cardStartTime:"",
                cardEndTime:"",
                cardDuration:"",
                totalDuration:""


            }
        },
        watch: {
            courseName: function () {
                console.log("值变化了");
                // this.currentCourseId=courses.COURSE_ID;
                let temp = {
                    id: this.currentCourseId,
                    authorId: this.currentCourseAuthorId
                }
                this.$store.dispatch("getUserCourse", temp).then((res) => {
                    console.log("+++++++   " + res);
                    console.log(this.$store.state.courseShort[0].COURSE_TOTALLESSON);
                    this.currentCourseNumber = this.$store.state.courseShort[0].COURSE_TOTALLESSON;
                    this.totalDuration = this.$store.state.courseShort[0].COURSE_TIMEDURATION;
                    // this.currentCourse = this.$store.state.courseShort[0];
                    this.getRecordsDetail();

                }).catch((err) => {
                    console.error(err);
                });
            },
            
        },
        computed: {
            courses() {
                return this.$store.state.myCoursesShortList;
            },

            timeFormat(){
                return timeConvert(this.cardDuration);
            },

            timeStampFormatE(){
                return timeStampConvert(this.cardEndTime)
            },
            timeStampFormatS(){
                return timeStampConvert(this.cardStartTime)
            },
            timeProgress(){
                // const total = this.totalDuration;
                let temp = 0
                this.$store.state.courseRecordsDetail.forEach((element)=>{
                    if(element.progress==100){
                        temp+=element.duration
                    }else{
                        temp+=element.currentTime
                    }
                });
                console.log(temp+"-----")
                console.log(this.totalDuration+"-----")
               let result = parseInt(temp*100/this.totalDuration)
                return result;
            }

        },
        created: function () {

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
            showDetail:function(index){
                this.cardStartTime = this.currentCourse[index].startTime
                this.cardEndTime = this.currentCourse[index].endTime
                this.cardDuration= this.currentCourse[index].duration
                // this.totalDuration= this.currentCourse[index].duration
            },
            getCourseName: function (course) {
                event.stopPropagation();
                this.courseName = course.COURSE_NAME;
                this.currentCourseId = course.COURSE_ID;
                this.currentCourseAuthorId = course.AUTHOR_ID;
                this.boxShow = false;
            },
            getRecordsDetail: function () {


                let payload = {
                    courseId: this.currentCourseId
                }
                this.$store.dispatch("getCourseRecords", payload).then(() => {
                    console.log("获取课程详情成功");
                    this.currentCourse = [...this.$store.state.courseRecordsDetail]
                    this.currentCourse.forEach((element, index, array) => {
                        if (element.progress < 50) {
                            // const temp = {

                            // }
                            let tempProgress = ""
                            tempProgress = "rotate(" + (element.progress * 360 / 100 + 180) + "deg)"
                            array[index] = { ...element, progressShow: tempProgress, color: "#6ed4bf", zindex: 5 }
                        } else if (element.progress == 50) {
                            // tempProgress=element.progress*360+180
                            // let tempProgress=0
                            let tempProgress = ""
                            tempProgress = "rotate(" + element.progress + "deg)"
                            array[index] = { ...element, progressShow: tempProgress, color: "#ffffff",zindex: 10 }
                        } else if (element.progress > 50) {
                            let tempProgress = ""
                            tempProgress = "rotate(" + ((element.progress - 50) * 360 / 100) + "deg)"
                            array[index] = { ...element, progressShow: tempProgress, color: "#ffffff",zindex: 15 }
                        }
                    });

                    for (let i = this.currentCourse.length; i < this.currentCourseNumber; i++) {
                        // console.log(i);
                        let tempProgress = ""
                        tempProgress = "rotate(0deg)"
                        const blank = {
                            progressShow: tempProgress, color: "#ffffff", statusFlag: false, greenColor: "#6ed4bf"
                        };
                        this.currentCourse[i] = blank
                    }
                }).catch((err) => {
                    console.error(err);
                });
            }
        },
    }
</script>