<template>
    <main class="rs-learning">
        <course-info></course-info>
        <div class="rs__select">
            <resource-info></resource-info>
            <info-block></info-block>
            <div class="rs__select__area">
                <div class=" rs__select__area__btn">
                    <button class="rs__select__area__btn__link">放弃</button>
                </div>
                <div class=" rs__select__area__btn">
                    <button class="rs__select__area__btn__link">保存</button>
                </div>
                <div class=" rs__select__area__btn">
                    <button class="rs__select__area__btn__link" @click="releaseCourse">发布</button>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    import CourseInfo from './CourseInfo';
    import InfoBlock from './InfoBlock';
    import ResourceInfo from './ResourceInfo';
    export default {
        components: {
            'course-info': CourseInfo,
            'info-block': InfoBlock,
            'resource-info':ResourceInfo
        },
        methods: {
            releaseCourse: function () {
                // let payload = {};
                // payload= {...this.courseProfile}
                console.log(this.$store.state.courseInfo);
                this.$store.dispatch("releaseCourse", this.$store.state.courseInfo).then(() => {
                    console.log("课程发布标志成功返回");
                }).catch((err) => {
                    console.error(err);
                });
            }
        },
        
    }
</script>