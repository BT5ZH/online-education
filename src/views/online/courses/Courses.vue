<template>
    <main class="rs-courses">
        <div class="courses-list">
            <div v-for="(course,index) in allTreasure" :key="index" class="course" >
                <img :src="course.COURSE_COVERURL" :alt="course.COURSE_NAME" class="course__img">
                <svg class="course__like" @click="selectToLearn(index)">
                    <use xlink:href="../../../assets/img/all.svg#icon-circle-with-plus"></use>
                </svg>
                <svg class="course__cart" @click.stop="gotoPay(index)">
                    <use xlink:href="../../../assets/img/all.svg#icon-shopping-cart"></use>
                </svg>
                
                <h5 class="course__name" @click="enrolledInfo(index)">{{course.COURSE_NAME}}</h5>

                <!-- <div class="course__author">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-eye"></use>
                    </svg>
                    <span>{{course.COURSE_AUTHORNAME}}</span>
                </div> -->
                <div class="course__student">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-users"></use>
                    </svg>
                    <span>{{course.COURSE_STUDENTS}}</span>
                </div>
                <div class="course__rank">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-star"></use>
                    </svg>
                    <span>{{course.COURSE_RANK}}</span>
                </div>
                <div class="course__price">
                    <svg>
                        <use xlink:href="../../../assets/img/all.svg#icon-key"></use>
                    </svg>
                    <span>FREE</span>
                </div>
                <!-- <button class="online-btn">
                    <router-link :to="{name:'learning',params:{courseId:course.COURSE_ID}}">开始学习</router-link>
                </button> -->
            </div>
            
        </div>
    </main>
</template>
<script>
    export default {
        data() {
            return {
                activeClass: 'rs__card--edit',
                resList: this.$store.state.resourceList,
                pinshow: false
            }
        },
        computed: {
            allTreasure() {
                return this.$store.state.courseAllList;
            }
        },
        created() {
            this.$store.dispatch("getAllCourses").then(() => {
                console.log("获取全部课程成功");
            }).catch((err) => {
                console.error(err);
            });
        },
        methods: {
            getLinkAddress: function (index) {
                let link = "/learning/";
                let temp = link + this.allTreasure[index].COURSE_ID
                return temp;
            },
            startToLearn: function (index) {
                this.$router.push({ name: 'learning', params: { courseId: this.allTreasure[index].COURSE_ID } })
            },
            selectToLearn: function (index) {
                event.stopPropagation();
                let payload = {
                    courseId: this.allTreasure[index].COURSE_ID,
                    courseName: this.allTreasure[index].COURSE_NAME,
                    courseStatus: this.allTreasure[index].COURSE_STATUS,
                    coverUrl: this.allTreasure[index].COURSE_COVERURL,
                    authorId: this.allTreasure[index].AUTHOR_ID
                }
                this.$store.dispatch("selectToLearn", payload).then(() => {
                    console.log("选择课程成功");
                    this.$toast.success({title:"添加成功",message:"本课程添加成功"});
                }).catch((err) => {
                    console.error(err);
                    this.$toast.error({title:"添加失败",message:"出错啦，课程添加失败"});
                });
            },
            enrolledInfo:function(index){
                this.$router.push( {
                    name:'enrolled',
                    params:{
                        courseId:this.$store.state.courseAllList[index].COURSE_ID,
                        authorId:this.$store.state.courseAllList[index].AUTHOR_ID
                    }
                }, ()=>{});
            },
            gotoPay: function (index) {
                let payload = {
                    courseCover: this.allTreasure[index].COURSE_COVERURL,
                    courseName: this.allTreasure[index].COURSE_NAME,
                    coursePrice : this.allTreasure[index].COURSE_PRICE,
                }
                
                //this.$store.state.payCourse = payload
                this.$store.commit('updatePayCourse',payload)
                console.log(this.$store.state.payCourse)
                this.$router.push({ name: 'payment', params: { courseId: this.allTreasure[index].COURSE_ID } })
            },
        },
    }
</script>