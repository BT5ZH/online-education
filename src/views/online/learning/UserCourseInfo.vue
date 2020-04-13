<template>
    <div class="course__info">
        <div class="cs">
            <div class="cs__header">
                <div class="cs__header__text">
                    <span class="cs__header__text--title">{{learningCourseInfo.COURSE_NAME}}</span>
                    <span class="heading-7 heading-7--dark">{{timeFormat(learningCourseInfo.COURSE_TIMEDURATION)}}</span>
                </div>
                <svg>
                    <use xlink:href="../../../assets/img/all.svg#icon-key"></use>
                </svg>
            </div>
            <div v-for="(chapter,index) in learningChapterList" :key="index" class="cs__list">
                <div class="cs__list__title">
                    <div class="cs__list__title--text">
                        <span>第{{index+1}}章：{{chapter.CHAPTER_NAME}}</span>
                        <span class="heading-7 heading-7--dark"> {{timeFormat(chapter.CHAPTER_TIMEDURATION)}} </span>
                    </div>
                    <div class="cs__list__title--show" >
                        <input type="checkbox" class="cs__list__title--show__check" :id="'navi-toogle-'+index" :checked="!openFlag[index]">
                        <label :for="'navi-toogle-'+index" class="cs__list__title--show__button" @click="showLesson(index,$event)" >
                            <svg class="cs__list__title--show__icon" > 
                                <use xlink:href="../../../assets/img/all.svg#icon-chevron-left"></use>
                            </svg>
                        </label>
                        
                    </div>
                </div>

                <ul class="cs__list__nav" :class="{cs__list__h:openFlag[index]}">
                    <li v-for="(lesson, number) in learningChapterList[index].LESSON_LIST" :key="number"
                        class="cs__list__nav__item" @click="activeCurrentLesson(index,number)">

                        <svg class="user-nav__icon">
                            <use xlink:href="img/all.svg#icon-bookmark"></use>
                        </svg>
                        <div class="link-item">
                            <a href="#" class="cs__list__nav__link">第{{lesson.LESSON_INDEX}}课:{{lesson.LESSON_NAME}}</a>
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
        props:{
            openFlag:Array,
        },
        data() {
            return {
                isActive: [],
                // chapterShowFlag:[]
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
            // this.$set(this.openFlag, this.openFlag[0],this.openFlag[0]);
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
            showLesson:function(index,event){
                console.log("展开课程");
                event.stopPropagation();
                event.preventDefault();
                this.$set(this.openFlag, index, !this.openFlag[index]);
                // this.isActive[index] = !this.isActive[index];
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