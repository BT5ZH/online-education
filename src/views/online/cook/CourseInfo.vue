<template lang="">
    <div class="course__info">
        <div class="ci">
            <div class="ci__header">
                <svg class="search__icon" @click="addChapter">
                    <use xlink:href="../../../assets/img/all.svg#icon-check"></use>
                </svg>
                <div class="ci__header--text">
                    <label v-if="!courseNameEdit" for="">
                        <span v-if="!courseProfile.courseName">课程内容</span>
                        <span v-if="courseProfile.courseName">{{courseProfile.courseName}}</span>
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
            <div class="ci__list" v-for="(chapter,index) in courseProfile.chapterList" :key="index">
                <div class="ci__list__title">
                    <svg class="search__icon">
                        <use xlink:href="../../../assets/img/all.svg#icon-check"></use>
                    </svg>
                    <div class="ci__list__title--text">
                        <label v-if="!courseProfile.chapterList[index].editFlag" for="">
                            <span
                                v-if="courseProfile.chapterList[index].chapterName">第{{index+1}}节：{{courseProfile.chapterList[index].chapterName}}</span>
                            <span v-if="!courseProfile.chapterList[index].chapterName">请输入章节名称</span>
                        </label>
                        <input v-if="courseProfile.chapterList[index].editFlag" v-model="courseProfile.chapterList[index].chapterName"
                            type="text" name="courseName" id="courseName" placeholder="请输入章节名">
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
                    <li class="ci__list__nav__item"
                        v-for="(content,number) in courseProfile.chapterList[index].lessonList" :key="number"
                        @dbclick="lockResource(index,number)"
                        >
                        <!-- <div class="ci__list__nav__item__layout"> -->
                        <svg class="search__icon">
                            <use xlink:href="../../../assets/img/all.svg#icon-pin"></use>
                        </svg>
                        <div class="link-item">
                            <label v-if="!courseProfile.chapterList[index].lessonList[number].editFlag" for="">
                                <span
                                    v-if="!courseProfile.chapterList[index].lessonList[number].lessonName">请输入课名</span>
                                <span
                                    v-if="courseProfile.chapterList[index].lessonList[number].lessonName">第{{number+1}}课：{{courseProfile.chapterList[index].lessonList[number].lessonName}}</span>
                            </label>
                            <!-- <a href="#" class="ci__list__nav__link">第{{number+1}}课：{{content.title}}</a> -->

                            <input v-if="courseProfile.chapterList[index].lessonList[number].editFlag"
                                v-model="courseProfile.chapterList[index].lessonList[number].lessonName" type="text"
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
            resourceList(){
                return this.$store.state.resourceList;
            },
            currentIndex(){
                return this.$store.state.currentResourceIndex;
            }
        },
        methods: {
            addChapter: function () {
                if (!this.courseProfile.courseName) {
                    this.$toast.error({ title: "注意：课程名还未设置", message: "请先设置课程名再添加章节" })
                    return false;
                } else {
                    //比较当前值和已经存在的值
                    console.log("部分逻辑待处理");
                }
                let chapterContent = {
                    "chapterName": "",
                    "editFlag": false,
                    "timeDuration": 0,
                    "index": 0,
                    "lessonList": []
                }

                this.$store.dispatch("addChapter", chapterContent).then(() => {
                    console.log("添加章节成功返回");
                }).catch((err) => {
                    console.error(err);
                });
                this.chapterNameEdit.push(false);
            },
            addLesson: function (parentIndex) {

                if (!this.courseProfile.chapterList[parentIndex].chapterName) {
                    this.$toast.error({ title: "注意：章节名不能为空", message: "请先设置章节名再添加课内容" })
                    return false;
                } else {
                    //比较当前值和已经存在的值
                    console.log("部分lesson逻辑待处理");
                }
                let lessonContent = {
                    "lessonName": "",
                    "editFlag": false,
                    "resourceUrl": "",
                    "resourceType": "",
                    "resourceSize": 0,
                    "resourceName": "",
                    "resourceId": "",
                    "timeDuration": 0,
                    "index": 0,
                    "parentIndex": parentIndex
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
                    if (!this.courseProfile.courseName) {

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
                this.$store.dispatch("updateChapterEditFlag",pd).then(() => {
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
                    console.log("seesee" + this.courseProfile.chapterList[index].chapterName);
                    console.log(!this.courseProfile.chapterList[index].chapterName);
                    if (!this.courseProfile.chapterList[index].chapterName) {
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
                        number:number
                    }
                this.$store.dispatch("updateLessonEditFlag",pd).then(() => {
                            console.log("单课编辑标志成功返回");
                            console.log(this.courseProfile.chapterList[index].lessonList[number].editFlag);
                        }).catch((err) => {
                            console.error(err);
                        });

                // if (this.lessonNameEdit[number] === true) {
                //     console.log("课名区域可编辑")
                // } else {
                //     let payload = {
                //         lessonName: this.chapterName,
                //         index: index,
                //         number: number
                //     }
                //     console.log("kankan" + this.courseProfile.chapterList[index].lessonList[number].lessonName);
                //     console.log(!this.courseProfile.chapterList[index].lessonList[number].lessonName);
                //     if (!this.courseProfile.chapterList[index].lessonList[number].lessonName) {
                //         console.log("nihao:   " + index);
                //         this.$store.dispatch("updateLessonName", payload).then(() => {
                //             console.log("添加课名成功返回");
                //         }).catch((err) => {
                //             console.error(err);
                //         })
                //     }

                // }
            },
            lockResource: function (index, number) {
                console.log("经来啦")
                // console.log(this.$store.state.tempRsUrl)

                let pd = {
                        index: index,
                        number:number,
                        id: this.resourceList[this.currentIndex].id,
                        name: this.resourceList[this.currentIndex].name,
                        size: this.resourceList[this.currentIndex].size,
                        type: this.resourceList[this.currentIndex].type,
                        url:this.resourceList[this.currentIndex].url
                    }
                this.$store.dispatch("lockResource",pd).then(() => {
                            console.log("锁定资源标志成功返回");
                            console.log(this.courseProfile.chapterList[index].lessonList[number].editFlag);
                        }).catch((err) => {
                            console.error(err);
                        });
            }

        }
    }
</script>