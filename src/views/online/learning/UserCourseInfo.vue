<template>
    <div class="course__info">
        <div class="cs">
            <div class="cs__header">
                <span class="cs__header-text">{{learningCourseInfo.COURSE_NAME}}</span>
                <svg class="search__icon">
                    <use xlink:href="img/all.svg#icon-key"></use>
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
                    <li v-for="(lesson, number) in learningChapterList[index].LESSON_LIST" :key="number"
                        class="cs__list__nav__item" @click="activeCurrentLesson(index,number)">

                        <svg class="user-nav__icon">
                            <use xlink:href="img/all.svg#icon-bookmark"></use>
                        </svg>
                        <div class="link-item">
                            <a href="#" class="cs__list__nav__link">第{{number+1}}课:{{lesson.LESSON_NAME}}</a>
                            <span class="heading-7 heading-7--dark">{{timeFormat(lesson.LESSON_TIMEDURATION)}}</span>
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
            '$route'(to, from) {
                this.rsId = to.params.rsId;
                console.log(from)
            }
        },
        created() {
        },
        methods: {
            activeCurrentLesson: function (index, number) {
                let payload = {
                    index,
                    number
                }
                this.$store.dispatch("showCurrentLesson", payload).then(() => {
                    console.log("播放视频成功");
                }).catch((err) => {
                    console.error(err);
                });
            },
            timeFormat: function (s) {
                let day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
                let hour = Math.floor((s - day * 24 * 3600) / 3600);
                let minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
                let second = Math.floor(s - day * 24 * 3600 - hour * 3600 - minute * 60);
                let result = "";
                if (day > 0) {
                    result = day + "天" + hour + "时" + minute + "分" + second + "秒";
                } else if (day == 0 && hour > 0) {
                    result = hour + "时" + minute + "分" + second + "秒";
                } else if (day == 0 && hour == 0 && minute > 0) {
                    result = minute + "分" + second + "秒";
                } else if (day == 0 && hour == 0 && minute == 0 && second > 0) {
                    result = second + "秒";
                }
                return result
            },
        },
    }
</script>