<template>
    <main class="rs-learning">
        <course-info></course-info>
        <div class="rs__select">
            <resource-info></resource-info>
            <info-block></info-block>
            <div class="rs__select__area">
                <div class=" rs__select__area__btn">
                    <button class="rs__select__area__btn__link" @click="backToCookTop">放弃</button>
                </div>
                <div class=" rs__select__area__btn">
                    <button class="rs__select__area__btn__link" @click="saveCourse">保存</button>
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
        data() {
            return {
                courseId: this.$route.params.courseId
            }
        },
        components: {
            'course-info': CourseInfo,
            'info-block': InfoBlock,
            'resource-info': ResourceInfo
        },
        created() {
            // let temp= this.courseId;
            if (this.courseId != "new") {
                let payload = {
                    courseId: this.courseId
                }
                this.$store.dispatch("editTheCourse", payload).then(() => {
                    console.log("-----------");
                }).catch((err) => {
                    console.error(err);
                });
            }
            // console.log("%%%%%%%%%%%%"+temp);
        },
        methods: {
            releaseCourse: function () {
                let payload = {
                    courseStatus:"finish",
                }
                this.$store.dispatch("updateCourseStatus", payload).then(() => {
                    console.log("课程状态标志成功返回");
                }).catch((err) => {
                    console.error(err);
                });
                // let payloadContent = {
                //     course:this.$store.state.resourceList,
                //     resource:this.$store.state.courseInfo
                // }
                // console.log(payloadContent)
                this.$store.dispatch("releaseCourse", this.$store.state.courseInfo).then(() => {
                    console.log("课程发布标志成功返回");
                    
                }).catch((err) => {
                    console.error(err);
                });
                // this.$store.dispatch("updateResourceList",this.$store.state.resourceList).then(()=>{
                //     console.log("资源状态标志成功返回");
                //     this.$router.push({ name: 'cookFirst' })
                // }).catch((err) => {
                //     console.error(err);
                // });
            },
            saveCourse: function () {
                let payload = {
                    courseStatus:"save",
                }
                this.$store.dispatch("updateCourseStatus", payload).then(() => {
                    console.log("课程状态标志成功返回");
                }).catch((err) => {
                    console.error(err);
                });
                this.$store.dispatch("releaseCourse", this.$store.state.courseInfo).then(() => {
                    console.log("课程发布标志成功返回");
                    this.$router.push({ name: 'cookFirst' })
                }).catch((err) => {
                    console.error(err);
                });
            },
            backToCookTop: function () {
                console.log("backToCookTop 方法   进来啦");
                let dummy = {};
                this.$store.dispatch("backToCookTop", dummy).then(() => {
                    console.log("放弃创建课程");
                    this.$router.push({ name: 'cookFirst' })
                }).catch((err) => {
                    console.error(err);
                });
            }
        },

    }
</script>