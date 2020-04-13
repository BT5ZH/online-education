<template>
    <div class="video-block">
        <video id="user-video" :key="currentVideo" class="video-block__content" preload="auto" controlsList="nodownload"
            controls autoplay @play="onPlay" @pause="onPause" @ended="onEnded" @timeupdate="onTimeChange">
            <!--    @durationchange="onDurationChange" @timeupdate="onTimeChange" abort="onAbort"  @waiting="onWaiting" @seeking="onSeeking"-->
            <source :src="currentVideo" type="video/mp4">
            Your browser is not supported!
        </video>
        {{$route.params.rsId}}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                videoBox: null,
                auto: false,
                currentIndex: 0,
                timeChange:false
            }
        },
        watch: {

        },
        mounted() {
            
        },
        computed: {
            currentVideo() {
                return this.$store.state.currentLessonRSUrl;
            },

        },
        created() {
            
        },
        methods: {
            onPlay: function () {
                
                const timeStart = new Date().getTime();
                let coordinates = this.$store.state.currentLessonIndex;
                console.log(coordinates);
                let actionContent = {
                    key: "play",
                    type: "videoStart",
                    startTime: timeStart,
                    lessonCoordinates: this.$store.state.currentLessonIndex,
                    videoCurrentTime: document.getElementById('user-video').currentTime,
                    videoDuration: document.getElementById('user-video').duration,
                    // totalTime: this.learningCourseInfo.COURSE_TIMEDURATION,
                    // totalLesson: this.learningCourseInfo.COURSE_TOTALLESSON,
                }
                let lessonStatus = {
                    key:'play',
                    index: this.$store.state.currentLessonIndex.index - 1,
                    progress: 0,
                    startTime: timeStart,
                    currentTime: 0,
                    coordinates: coordinates,
                    duration: document.getElementById('user-video').duration,
                }
                console.log("开始播放啦");
                console.log(lessonStatus);
                let payload ={
                    lessonStatus:lessonStatus,
                    actionContent:actionContent
                }
                this.$store.dispatch("updateCourseLearningStatus", payload).then(() => {
                    console.log("设置标志可以timeChange：以预防异步问题");
                    this.timeChange = true;
                }).catch((err) => {
                    console.error(err);
                });
                
                // this.$store.dispatch("addAction", actionContent).then(() => {
                //     console.log("返回");
                // }).catch((err) => {
                //     console.error(err);
                // });;
            },
            onPause: function () {
                if (document.getElementById('user-video') == null) {
                    console.log("播放暂停啦");
                    let actionContent = {
                        key: "pause",
                        type: "videoPause",
                        pauseTime: new Date().getTime(),
                        lessonCoordinates: this.$store.state.currentLessonIndex-1,
                        videoCurrentTime: 0,
                        videoDuration: 0
                    }
                    this.$store.dispatch("addAction", actionContent).then(() => {
                        console.log("返回");
                    }).catch((err) => {
                        console.error(err);
                    });
                } else {
                    console.log("播放暂停啦");
                    let actionContent = {
                        key: "pause",
                        type: "videoPause",
                        pauseTime: new Date().getTime(),
                        lessonCoordinates: this.$store.state.currentLessonIndex-1,
                        videoCurrentTime: document.getElementById('user-video').currentTime,
                        videoDuration: document.getElementById('user-video').duration
                    }
                    this.$store.dispatch("addAction", actionContent).then(() => {
                        console.log("返回");
                    }).catch((err) => {
                        console.error(err);
                    });
                }
            },
            onEnded: function () {
                console.log("播放结束啦");
                const timeEnd = new Date().getTime();
                let actionContent = {
                    key: "end",
                    type: "videoEnd",
                    endTime: timeEnd,
                    lessonCoordinates: this.$store.state.currentLessonIndex-1,
                    videoCurrentTime: document.getElementById('user-video').currentTime,
                    videoDuration: document.getElementById('user-video').duration
                }

                let lessonStatus = {
                    index: this.$store.state.currentLessonIndex.index - 1,
                    key:"end",
                    progress: 100,
                    endTime: timeEnd,
                    
                }
                
                let payload ={
                    lessonStatus:lessonStatus,
                    actionContent:actionContent
                }
                console.log("返回");
                this.$store.dispatch("updateCourseLearningStatus", payload).then(() => {
                    console.log("返回");
                }).catch((err) => {
                    console.error(err);
                });
            },


            onTimeChange: function () {
                // 保留两位小数( Math.round(num*100)/100);
                if (this.currentIndex % 20 == 0 && this.timeChange==true) {
                    let up=document.getElementById('user-video').currentTime
                    let bottom=document.getElementById('user-video').duration
                    let lessonStatus = {
                        key:'time',
                        index: this.$store.state.currentLessonIndex.index - 1,
                        currentTime: document.getElementById('user-video').currentTime,
                        lessonCoordinates: this.$store.state.currentLessonIndex,
                        progress:parseInt(up*100/bottom)
                    }
                    
                    this.$store.commit("updateCourseLearningStatus", lessonStatus);
                }
                this.currentIndex++
            },
        },
    }
</script>