<template>
    <main class="rs-learning">
        <router-view></router-view>
        <user-course :openFlag="isActive"></user-course>
        <div class="course__learn">
            <user-video></user-video>
            <user-info></user-info>
        </div>
    </main>
</template>
<script>
    import UserCourseInfo from './UserCourseInfo';
    import UserInfoBlock from './UserInfoBlock';
    import UserVideoBlock from './UserVideoBlock';
    export default {
        data() {
            return {
                courseId: this.$route.params.courseId,
                authorId: this.$route.params.authorId,
                isActive: []
            }
        },
        created() {
            let payload = {
                courseId: this.courseId,
                authorId: this.authorId
            }
            this.$store.dispatch("learningTheCourse", payload).then((res) => {
                if (res == "rs-120") {
                    

                    //初始化当前课程状态记录
                    

                    //开始记录学习活动，并查看历史选择进入那一章节哪一课
                    let data = {
                        key: "stepIn",
                        startTime: new Date().getTime(),

                    }
                    this.$store.dispatch("updateActivityInfo", data).then(() => {
                        console.log("返回");
                    }).catch((err) => {
                        console.error(err);
                    });

                    let courseLength = this.$store.state.courseLearningStatus.length - 1
                    console.log(courseLength);
                    let temp = {}
                    let currentChapter = 0;
                    if (courseLength != -1 && this.$store.state.courseLearningStatus[courseLength]) {
                        console.log(this.$store.state.courseLearningStatus[courseLength]);
                        if (this.$store.state.courseLearningStatus[courseLength].progress == 100) {
                            //指向下一课
                            let xC = this.$store.state.courseLearningStatus[courseLength].coordinates.chapter;
                            let xL = this.$store.state.courseLearningStatus[courseLength].coordinates.lesson;
                            let lessonNumberOfCurrentChapter = this.$store.state.learningCourseInfo.CHAPTER_LIST[xC - 1].LESSON_LIST.length;
                            let chapterNumberOfCurrentCourse = this.$store.state.learningCourseInfo.CHAPTER_LIST.length;
                            console.log("---- 1 xC " + xC);
                            console.log("---- 1 xL " + xL);
                            console.log("---- 1 lessonNumberOfCurrentChapter " + lessonNumberOfCurrentChapter);
                            console.log("---- 1 chapterNumberOfCurrentCourse " + chapterNumberOfCurrentCourse);

                            if (xL < lessonNumberOfCurrentChapter) {
                                //到本章的下一课
                                console.log("---- 2");
                                temp = {
                                    index: xC - 1,
                                    number: xL
                                }
                                currentChapter = xC-1
                                this.$store.commit("showCurrentLesson", temp)
                            } else if (xC < chapterNumberOfCurrentCourse) {
                                console.log("---- 3");
                                //到下一章第一课
                                temp = {
                                    index: xC,
                                    number: 0
                                }
                                currentChapter = xC
                                this.$store.commit("showCurrentLesson", temp)
                            } else {
                                console.log("这么课程学完啦")
                            }

                        } else {
                            let xC = this.$store.state.courseLearningStatus[courseLength].coordinates.chapter;
                            let xL = this.$store.state.courseLearningStatus[courseLength].coordinates.lesson;
                            console.log("---- 2");
                            temp = {
                                index: xC - 1,
                                number: xL - 1
                            }
                            currentChapter = xC-1
                            // this.$store.commit("showCurrentLesson", temp)
                            this.$store.dispatch("showCurrentLesson", temp).then(() => {
                                console.log("继续播放视频");
                                document.getElementById('user-video').currentTime
                                    = this.$store.state.courseLearningStatus[courseLength].currentTime;
                                document.getElementById('user-video').play();
                            }).catch((err) => {
                                console.error(err);
                            });

                        }

                    }
                
                    //控制章节下拉开合 为了更新视图
                    let i = 0;
                    for (i = 0; i < this.$store.state.learningCourseInfo.CHAPTER_LIST.length; i++) {
                        if(currentChapter==i){
                            this.isActive[i]=false
                        }else{
                            this.isActive[i] = true;
                        }
                        
                    }
                    this.$set(this.isActive, this.isActive[0], this.isActive[0]);
                }
            }).catch((err) => {
                console.error(err);
            });

        },
        beforeDestroy() {
            //判断是否一节课结束之前中途退出
            console.log("直接点退出按钮会不会执行")
            //提交本次活动详情数据
            let payload = {
                data: {
                    learningDetail: this.$store.state.currentActivity,
                    learningProgress: this.$store.state.courseLearningStatus,
                },
                courseId: this.courseId
            };
            this.$store.dispatch("submitLearningActivityInfo", payload).then((res) => {
                if (res == "rs-120") {
                    console.log(res);

                }

            }).catch((err) => {
                console.error(err);
            });
        },
        components: {
            'user-course': UserCourseInfo,
            'user-info': UserInfoBlock,
            'user-video': UserVideoBlock
        },
    }
</script>