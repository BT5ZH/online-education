<template lang="">
    <div class="course__info">
        <div class="ci">
            <div class="ci__header">
                <svg class="search__icon" @click="lockCover">
                    <use xlink:href="../../../assets/img/all.svg#icon-check"></use>
                </svg>
                <div class="ci__header--text">
                    <label v-if="!courseNameEdit" for="">
                        <span v-if="!courseProfile.COURSE_NAME">课程内容</span>
                        <span v-if="courseProfile.COURSE_NAME">{{courseProfile.COURSE_NAME}}</span>
                    </label>
                    <input v-if="courseNameEdit" v-model="courseName" type="text" name="courseName" id="courseName"
                        placeholder="请输入课程名">
                </div>
                <div class="ci__header--tail">
                    <svg class="ci__header--tail--1" @click="addChapter">
                        <use xlink:href="../../../assets/img/all.svg#icon-circle-with-plus"></use>
                    </svg>
                    <svg class="ci__header--tail--2" @click="editCourseName">
                        <use xlink:href="../../../assets/img/all.svg#icon-edit"></use>
                    </svg>
                    <svg class="ci__header--tail--3">
                        <use xlink:href="../../../assets/img/all.svg#icon-circle-with-minus"></use>
                    </svg>
                </div>

            </div>
            <div class="ci__list" v-for="(chapter,index) in courseProfile.CHAPTER_LIST" :key="index">
                <div class="ci__list__title">
                    <svg class="search__icon">
                        <use xlink:href="../../../assets/img/all.svg#icon-check"></use>
                    </svg>
                    <div class="ci__list__title--text">
                        <label v-if="!courseProfile.CHAPTER_LIST[index].CHAPTER_EDITFLAG" for="">
                            <span
                                v-if="courseProfile.CHAPTER_LIST[index].CHAPTER_NAME">第{{index+1}}节：{{courseProfile.CHAPTER_LIST[index].CHAPTER_NAME}}</span>
                            <span v-if="!courseProfile.CHAPTER_LIST[index].CHAPTER_NAME">请输入章节名称</span>
                        </label>
                        <input v-if="courseProfile.CHAPTER_LIST[index].CHAPTER_EDITFLAG"
                            v-model="courseProfile.CHAPTER_LIST[index].CHAPTER_NAME" type="text" name="courseName"
                            id="courseName" placeholder="请输入章节名">
                    </div>
                    <div class="ci__list__title--tail">
                        <svg class="ci__list__title--tail--1" @click="addLesson(index)">
                            <use xlink:href="../../../assets/img/all.svg#icon-circle-with-plus"></use>
                        </svg>
                        <svg class="ci__list__title--tail--2">
                            <use xlink:href="../../../assets/img/all.svg#icon-edit" @click="editChapterName(index)">
                            </use>
                        </svg>
                        <svg class="ci__list__title--tail--3">
                            <use xlink:href="../../../assets/img/all.svg#icon-circle-with-minus"></use>
                        </svg>
                    </div>

                </div>
                <ul class="ci__list__nav">
                    <li :class="[courseProfile.CHAPTER_LIST[index].LESSON_LIST[number].LESSON_RESOURCE_URL?lessonCompleteClass:'','ci__list__nav__item ']"
                        v-for="(content,number) in courseProfile.CHAPTER_LIST[index].LESSON_LIST" :key="number">
                        <!-- <div class="ci__list__nav__item__layout"> -->
                        <svg class="search__icon">
                            <use xlink:href="../../../assets/img/all.svg#icon-check"
                                @click="lockResource(index,number)"></use>
                        </svg>
                        <div class="link-item">
                            <label v-if="!courseProfile.CHAPTER_LIST[index].LESSON_LIST[number].LESSON_EDITFLAG" for="">
                                <span
                                    v-if="!courseProfile.CHAPTER_LIST[index].LESSON_LIST[number].LESSON_NAME">请输入课名</span>
                                <span
                                    v-if="courseProfile.CHAPTER_LIST[index].LESSON_LIST[number].LESSON_NAME">第{{number+1}}课：{{courseProfile.CHAPTER_LIST[index].LESSON_LIST[number].LESSON_NAME}}</span>
                            </label>
                            <!-- <a href="#" class="ci__list__nav__link">第{{number+1}}课：{{content.title}}</a> -->

                            <input v-if="courseProfile.CHAPTER_LIST[index].LESSON_LIST[number].LESSON_EDITFLAG"
                                v-model="courseProfile.CHAPTER_LIST[index].LESSON_LIST[number].LESSON_NAME" type="text"
                                name="courseName" id="courseName" placeholder="请输入课名">
                        </div>
                        <div class="ci__list__nav__item--tail">
                            <svg class="ci__list__nav__item--tail--2">
                                <use xlink:href="../../../assets/img/all.svg#icon-edit"
                                    @click="editLessonName(index,number)">
                                </use>
                            </svg>
                            <svg class="ci__list__nav__item--tail--3">
                                <use xlink:href="../../../assets/img/all.svg#icon-circle-with-minus"></use>
                            </svg>

                        </div>
                        <!-- </div> -->


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
                courseName: "",
                courseNameEdit: false,
                chapterNameEdit: [],
                lessonNameEdit: [],
                lessonCompleteClass: 'ci__list__nav__complete'
                // courseInfo: {
                //     chapterList: [
                //     ],
                // }
            }
        },
        computed: {
            courseProfile() {
                return this.$store.state.courseInfo;
            },
            resourceList() {
                return this.$store.state.resourceList;
            },
            currentIndex() {
                return this.$store.state.currentResourceIndex;
            }
        },
        methods: {
            addChapter: function () {
                if (!this.courseProfile.COURSE_NAME) {
                    this.$toast.error({ title: "注意：课程名还未设置", message: "请先设置课程名再添加章节" })
                    return false;
                } else {
                    //比较当前值和已经存在的值
                    console.log("部分逻辑待处理");
                }
                let chapterContent = {
                    "CHAPTER_NAME": "",
                    "CHAPTER_EDITFLAG": false,
                    "CHAPTER_TIMEDURATION": 0,
                    "CHAPTER_INDEX": 0,
                    "LESSON_LIST": []
                }

                this.$store.dispatch("addChapter", chapterContent).then(() => {
                    console.log("添加章节成功返回");
                }).catch((err) => {
                    console.error(err);
                });
                this.chapterNameEdit.push(false);
            },
            addLesson: function (parentIndex) {

                if (!this.courseProfile.CHAPTER_LIST[parentIndex].CHAPTER_NAME) {
                    this.$toast.error({ title: "注意：章节名不能为空", message: "请先设置章节名再添加课内容" })
                    return false;
                } else {
                    //比较当前值和已经存在的值
                    console.log("部分lesson逻辑待处理");
                }
                let lessonContent = {
                    "LESSON_NAME": "",
                    "LESSON_EDITFLAG": false,
                    "LESSON_RESOURCE_URL": "",
                    "LESSON_RESOURCE_TYPE": "",
                    "LESSON_RESOURCE_SIZE": 0,
                    "LESSON_RESOURCE_NAME": "",
                    "LESSON_RESOURCE_ID": "",
                    "LESSON_TIMEDURATION": 0,
                    "LESSON_INDEX": 0,
                    "LESSON_PARENTINDEX": parentIndex
                }
                const payload = {
                    chapterIndex: parentIndex,
                    // lessonIndex: number,
                    lesson: lessonContent
                }

                this.$store.dispatch("addLesson", payload).then(() => {
                    console.log("添加课课课成功返回");
                }).catch((err) => {
                    console.error(err);
                });

                this.lessonNameEdit.push(false);


            },
            editCourseName: function () {
                this.courseNameEdit = !this.courseNameEdit;
                if (this.courseNameEdit === true) {
                    console.log("fuck ou")

                } else {
                    let payload = {
                        courseName: this.courseName
                    }
                    if (!this.courseProfile.COURSE_NAME) {

                        this.$store.dispatch("updateCourseName", payload).then(() => {
                            console.log("添加课程名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }


                    this.courseName = "";
                }
            },
            editChapterName: function (index) {
                // this.$set(this.chapterNameEdit, index, !this.chapterNameEdit[index])
                let pd = {
                    index: index
                }
                this.$store.dispatch("updateChapterEditFlag", pd).then(() => {
                    console.log("章节编辑标志成功返回");
                }).catch((err) => {
                    console.error(err);
                });

                if (this.chapterNameEdit[index] === true) {
                    console.log(index)
                } else {
                    let payload = {
                        chapterName: this.chapterName,
                        index: index
                    }
                    console.log("seesee" + this.courseProfile.CHAPTER_LIST[index].CHAPTER_NAME);
                    console.log(!this.courseProfile.CHAPTER_LIST[index].CHAPTER_NAME);
                    if (!this.courseProfile.CHAPTER_LIST[index].CHAPTER_NAME) {
                        console.log("nihao:   " + index);
                        this.$store.dispatch("updateChapterName", payload).then(() => {
                            console.log("添加章节名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }

                }
            },
            editLessonName: function (index, number) {

                // this.$set(this.lessonNameEdit, number, !this.lessonNameEdit[number]);
                let pd = {
                    index: index,
                    number: number
                }
                this.$store.dispatch("updateLessonEditFlag", pd).then(() => {
                    console.log("单课编辑标志成功返回");
                    console.log(this.courseProfile.CHAPTER_LIST[index].LESSON_LIST[number].LESSON_EDITFLAG);
                }).catch((err) => {
                    console.error(err);
                });
            },
            lockResource: function (index, number) {
                console.log("经来啦")
                console.log(this.resourceList)
                console.log(this.currentIndex)
                if (this.currentIndex == -1) {
                    this.$toast.warn({ title: "温馨提示", message: "请您先选择资源，再进行关联" })
                } else {
                    let pd = {
                        index: index,
                        number: number,
                        id: this.resourceList[this.currentIndex].id,
                        name: this.resourceList[this.currentIndex].name,
                        size: this.resourceList[this.currentIndex].size,
                        type: this.resourceList[this.currentIndex].type,
                        url: this.resourceList[this.currentIndex].url
                    }
                    this.$store.dispatch("lockResource", pd).then(() => {
                        console.log("锁定资源标志成功返回");
                        console.log(this.courseProfile.CHAPTER_LIST[index].LESSON_LIST[number].LESSON_EDITFLAG);
                    }).catch((err) => {
                        console.error(err);
                    });
                }
            },
            lockCover:function(){
                console.log("lockCover 进来啦")
                console.log(this.resourceList)
                console.log(this.currentIndex)
                if (this.currentIndex == -1) {
                    this.$toast.warn({ title: "温馨提示", message: "请您先选择资源，再进行关联" })
                } else {
                    let pd = {
                        id: this.resourceList[this.currentIndex].id,
                        name: this.resourceList[this.currentIndex].name,
                        size: this.resourceList[this.currentIndex].size,
                        type: this.resourceList[this.currentIndex].type,
                        url: this.resourceList[this.currentIndex].url
                    }
                    this.$store.dispatch("lockCover", pd).then(() => {
                        console.log("锁定封面标志成功返回");
                        console.log(this.courseProfile.COURSE_COVERURL);
                    }).catch((err) => {
                        console.error(err);
                    });
                }
            }
        },
    }
</script>