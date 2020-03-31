<template>
    <div class="enrolled">
        <div class="enrolled__header">
            <div class="enrolled__header__number">
                <h3 class="enrolled__header__number--txt">{{enrolledUser.length}}</h3>
                <span class="enrolled__header__number--info">人注册</span>
                <div class="enrolled__header__number--separator"></div>
                <div class="enrolled__header__number--des">
                    <div class="enrolled__header__number--des--1">
                        <span class="enrolled__header__number--des--1--l">2017级</span>
                        <span class="enrolled__header__number--des--1--r">软件工程</span>

                    </div>
                    <div class="enrolled__header__number--des--2">
                        <span class="enrolled__header__number--des--2--l">计算机科学学院</span>
                        <span class="enrolled__header__number--des--2--r">陕西师范大学</span>
                    </div>
                </div>
            </div>
            <div class="enrolled__header__complete">
                <h3 class="enrolled__header__number--txt">{{enrolledMember.length}}</h3>
                <span class="enrolled__header__number--info">人完成</span>
                <div class="enrolled__header__number--separator"></div>
            </div>
            <div class="enrolled__header__rank">
                <h3 class="enrolled__header__number--txt">{{enrolledMember.length}}</h3>
                <span class="enrolled__header__number--info">人通过</span>
                <div class="enrolled__header__number--separator"></div>
            </div>
        </div>
        <div class="enrolled__content">
            <div class="enrolled__content__l">
                <div class="enrolled__content__l__progress" v-for="(student,index) in enrolledMemberProgress" :key="index">
                    <div class="enrolled__content__l__progress--image">
                        <img :src="enrolledMemberProgress[index].profile.AVATAR" alt="" @click="shortInfoShow(index)">
                        <div class="enrolled__content__l__progress--short">
                            {{enrolledMemberProgress[index].profile.NAME}}
                        </div>
                    </div>
                    <div class="enrolled__content__l__progress--bar">
                        <div class="enrolled__content__l__progress--bar--in"
                            :style="{'width':enrolledMemberProgress[index].time}">{{enrolledMemberProgress[index].time}}</div>
                    </div>
                </div>
            </div>
            <div class="enrolled__content__r"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                enrolledMember: [],
                // enrolledMemberProgress: [],
                courseId: this.$route.params.courseId,
                authorId: this.$route.params.authorId,
                // enrolledUser: this.$store.state.courseStsInfo
            }
        },
        computed: {
            enrolledUser(){
                return this.$store.state.courseStsInfo
            },
            userInfo() {
                return this.$store.state.userProfile;
            },
            // studentList() {
            //     return this.enrolledMember
            // },
            enrolledMemberProgress(){
                let progressInfo = [];
                this.$store.state.courseStsInfo.forEach(element => {
                if (element.LEARNING_PROGRESS) {
                        let timeNumber = 0
                        let numberLesson = element.LEARNING_PROGRESS.length;
                        //判断数组最后一个是否100%
                        if (element.LEARNING_PROGRESS[element.LEARNING_PROGRESS.length - 1].progress == 100) {
                            for (let i = 0; i < element.LEARNING_PROGRESS.length; i++) {
                                timeNumber += element.LEARNING_PROGRESS[i].duration;
                            }
                        } else {
                            for (let i = 0; i < element.LEARNING_PROGRESS.length-1; i++) {
                                timeNumber += element.LEARNING_PROGRESS[i].duration;
                            }
                            timeNumber += element.LEARNING_PROGRESS[element.LEARNING_PROGRESS.length - 1].currentTime
                        }
                            timeNumber =Math.round((timeNumber*100/this.$store.state.courseBrifInfo.COURSE_TIMEDURATION))
                            numberLesson =Math.round((numberLesson*100/this.$store.state.courseBrifInfo.COURSE_TOTALLESSON))
                        let info = {
                            time:timeNumber+"%",
                            timeNumber:timeNumber,
                            common:numberLesson+"%",
                            profile:element.USER_PROFILE
                        }
                        progressInfo.push(info);
                    }else{
                        let info = {
                            time:0+"%",
                            timeNumber:0,
                            common:0+"%",
                            profile:element.USER_PROFILE
                        }
                        progressInfo.push(info);
                    }
                });
                    return progressInfo.sort((a,b)=>b.timeNumber-a.timeNumber);
            }
        
        },
        created() {
            console.log(this.courseId)
            console.log(this.authorId)
            this.enrolledMember = [
                { name: "zhang", age: "66%" },
                { name: "wang", age: "90%" },
                { name: "li", age: "45%" },

            ];
            let payload = {
                courseId: this.courseId,
                authorId: this.authorId,
                workPlace: this.userInfo.WORKPLACE,
                department: this.userInfo.DEPARTMENT,
                major: this.userInfo.MAJOR,
                timeFlag: this.userInfo.TIME_FLAG
            }
            console.log(payload)
            this.$store.dispatch("getCourseStsInfo", payload).then(() => {
                console.log("课程统计信息");
                console.log(this.$store.state.courseStsInfo)
                console.log(this.$store.state.courseBrifInfo)
                this.calculateProgress();
                console.log(this.enrolledMemberProgress)
            }).catch((err) => {
                console.error(err);
            });

        },
        methods: {
            shortInfoShow: function (index) {
                console.log(index);

            },
            calculateProgress: function () {


                // this.$store.state.courseStsInfo.forEach(element => {

                    // if (element.LEARNING_PROGRESS) {
                    //     let timeNumber = 0
                    //     let numberLesson = element.LEARNING_PROGRESS.length;
                    //     //判断数组最后一个是否100%
                    //     if (element.LEARNING_PROGRESS[element.LEARNING_PROGRESS.length - 1].progress == 100) {
                    //         for (let i = 0; i < element.LEARNING_PROGRESS.length; i++) {
                    //             timeNumber += element.LEARNING_PROGRESS[i].duration;
                    //         }
                    //     } else {
                    //         for (let i = 0; i < element.LEARNING_PROGRESS.length-1; i++) {
                    //             timeNumber += element.LEARNING_PROGRESS[i].duration;
                    //         }
                    //         timeNumber += element.LEARNING_PROGRESS[element.LEARNING_PROGRESS.length - 1].currentTime
                    //     }
                    //     let info = {
                    //         time:timeNumber,
                    //         common:numberLesson
                    //     }
                    //     this.enrolledMemberProgress.push(info);
                    // }else{
                    //     let info = {
                    //         time:0,
                    //         common:0
                    //     }
                    //     this.enrolledMemberProgress.push(info);
                    // }
                // });
            }
        },
    }
</script>