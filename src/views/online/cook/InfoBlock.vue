<template>
    <div class="rs__select__iblock">
        <div class="rs__select__iblock__header">
            
                <div class="rs__select__iblock__header__item" >
                    <span class="rs__select__iblock__header__item__txt">概要</span>
                    <div class="rs__select__iblock__header__item__svg">
                        <svg class="rs__select__iblock__header__item__svg--1" @click="editCourseSummary">
                            <use xlink:href="../../../assets/img/all.svg#icon-edit"></use>
                        </svg>
                        <svg class="rs__select__iblock__header__item__svg--2" >
                            <use xlink:href="../../../assets/img/all.svg#icon-circle-with-minus"></use>
                        </svg>
                    </div>
                    
                </div>
                <div class="rs__select__iblock__header__item">
                    <span class="rs__select__iblock__header__item__txt">公告</span>
                    <div class="rs__select__iblock__header__item__svg">
                        <svg class="rs__select__iblock__header__item__svg--1" @click="editCourseAnnouncement">
                            <use xlink:href="../../../assets/img/all.svg#icon-edit"></use>
                        </svg>
                        <svg class="rs__select__iblock__header__item__svg--2" >
                            <use xlink:href="../../../assets/img/all.svg#icon-circle-with-minus"></use>
                        </svg>
                    </div>
                </div>
                
                
            
        </div>
        <div class="rs__select__iblock__content">
            <div class="rs__select__iblock__left">
                <label v-if="!courseSummaryEdit" for="">
                    <span v-if="!courseProfile.COURSE_SUMMARY">请输入课程摘要</span>
                    <span v-if="courseProfile.COURSE_SUMMARY">{{courseProfile.COURSE_SUMMARY}}</span>
                </label>
                <textarea class="rs__select__iblock__left_txt" rows="5" cols="46" 
                    v-if="courseSummaryEdit" v-model="courseProfile.COURSE_SUMMARY"  
                    name="courseSummary" id="courseSummary" placeholder="请输入课程概要"></textarea>
            </div>
            <div class="rs__select__iblock__detail">
                <label v-if="!courseAnnouncementEdit" for="">
                    <span v-if="!courseProfile.COURSE_ANNOUNCEMENT">请输入课程公告</span>
                    <span v-if="courseProfile.COURSE_ANNOUNCEMENT">{{courseProfile.COURSE_ANNOUNCEMENT}}</span>
                </label>
                <textarea class="rs__select__iblock__detail_txt" rows="5" cols="46" 
                    v-if="courseAnnouncementEdit" v-model="courseProfile.COURSE_ANNOUNCEMENT"  
                    name="courseAnnouncement" id="courseAnnouncement" placeholder="请输入课程公告"></textarea>
            </div>
            
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            courseSummaryEdit:false,
            courseAnnouncementEdit:false,
            courseSummary:"",
            courseAnnouncement:""
        }
    },
    computed: {
            courseProfile() {
                return this.$store.state.courseInfo;
            },
        },
        methods: {
            editCourseSummary: function () {
                this.courseSummaryEdit = !this.courseSummaryEdit;
                if (this.courseSummaryEdit === true) {
                    console.log("balabalabal")
                } else {
                    let payload = {
                        courseName: this.courseSummary
                    }
                    if (!this.courseProfile.COURSE_SUMMARY) {
                        this.$store.dispatch("updateCourseSummary", payload).then(() => {
                            console.log("添加课程名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }

                }
            },
            editCourseAnnouncement: function () {
                this.courseAnnouncementEdit = !this.courseAnnouncementEdit;
                if (this.courseAnnouncementEdit === true) {
                    console.log("balabalabal")
                } else {
                    let payload = {
                        courseName: this.courseAnnouncement
                    }
                    if (!this.courseProfile.COURSE_ANNOUNCEMENT) {
                        this.$store.dispatch("updateCourseAnnouncement", payload).then(() => {
                            console.log("添加课程名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }

                }
            },
        },
}
</script>