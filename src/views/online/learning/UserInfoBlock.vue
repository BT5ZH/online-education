<template>
    <div class="iblock">
        <div class="iblock__header">
            <ul class="iblock__nav">
                <li class="iblock__nav__item iblock__nav__item--active"><a href="#" class="iblock__nav__link">概要</a>
                </li>
                <li class="iblock__nav__item"><a href="#" class="iblock__nav__link">公告</a></li>
                <li class="iblock__nav__item"><a href="#" class="iblock__nav__link">问答</a></li>
                <li class="iblock__nav__item"><a href="#" class="iblock__nav__link">书签</a></li>
            </ul>
        </div>
        <div class="iblock__content">
            <div class="iblock__left">
                测试
            </div>
            <div class="iblock__detail">
                {{learningCourse.COURSE_SUMMARY}}
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
            learningCourse() {
                return this.$store.state.learningCourseInfo;
            }
        },
}
</script>