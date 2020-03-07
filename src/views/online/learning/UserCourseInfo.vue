<template>
    <div class="course__info">
        <div class="cs">
            <div class="cs__header">
                <span class="cs__header-text">{{learningCourseInfo.COURSE_NAME}}</span>
                <svg class="search__icon">
                    <use xlink:href="img/sprite.svg#icon-key"></use>
                </svg>
            </div>
            <div v-for="(chapter,index) in learningChapterList" :key="index" class="cs__list">
                <div class="cs__list__title">
                    <div class="cs__list__title--text">
                        <span>第{{index+1}}章：{{chapter.CHAPTER_NAME}}</span>
                        <span class="heading-7 heading-7--dark">7 / 13 &nbsp;|&nbsp; 33 分钟</span>
                    </div>
                </div>
                
                <ul class="cs__list__nav">
                    <li v-for="(lesson, number) in learningChapterList[index].LESSON_LIST" 
                        :key="number"
                        class="cs__list__nav__item"
                        @click="activeCurrentLesson(index,number)">

                        <svg class="user-nav__icon">
                            <use xlink:href="img/sprite2.svg#icon-bookmark"></use>
                        </svg>
                        <div class="link-item">
                            <a href="#" class="cs__list__nav__link">第{{number+1}}课:{{lesson.LESSON_NAME}}</a>
                            <span class="heading-7 heading-7--dark">{{lesson.LESSON_TIMEDURATION}}分钟</span>
                        </div>
                    </li>
                    

                </ul> 
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // rsId:this.$route.params.rsId
            }
        },
        computed: {
            learningCourseInfo() {
                return this.$store.state.learningCourseInfo;
            },
            learningChapterList() {
                return this.$store.state.learningCourseInfo.CHAPTER_LIST;
            },
        },
        watch: {
            '$route'(to, from){
                this.rsId = to.params.rsId;
                console.log(from)
            }
        },
        created() {
        },
        methods: {
            activeCurrentLesson:function(index,number){
                let payload ={
                    index,
                    number
                }
                this.$store.dispatch("showCurrentLesson",payload).then(() => {
                    console.log("播放视频成功");
                }).catch((err) => {
                    console.error(err);
                });
            }
        },
    }
</script>