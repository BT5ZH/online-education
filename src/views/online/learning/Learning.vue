<template>
    <main class="rs-learning">
        <router-view></router-view>
        <user-course></user-course>
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
        data(){
            return {
                courseId: this.$route.params.courseId,
                authorId: this.$route.params.authorId
            }
        },
        created() {
            let payload = {
                courseId: this.courseId,
                authorId:this.authorId
            }
            this.$store.dispatch("learningTheCourse",payload).then((res) => {
                if(res=="rs-102"){
                    // let data= {
                    //     key:"startTime",
                    //     value: new Date
                    // }
                    // this.$store.commit("learningActivity", data)
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