<template>
    <div class="video-block">
        <video :key="currentVideo" class="video-block__content" preload="auto" controlsList="nodownload" controls>
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

                
            }
        },
        watch: {
            
        },
        computed: {
            // initVideo(){
            //     return this.$store.state.learningCourseInfo.CHAPTER_LIST[0].LESSON_LIST[0].LESSON_RESOURCE_URL;
            // },
            currentVideo(){
                return this.$store.state.currentLessonRSUrl;
            }

        },
        created() {
            // this.currentVideo = this.$store.state.learningCourseInfo.CHAPTERLIST[0].LESSONLIST[0].LESSON_RESOURCE_URL;
        },
    }
</script>
