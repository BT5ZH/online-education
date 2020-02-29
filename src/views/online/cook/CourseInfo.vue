<template lang="">
    <div class="course__info">
        <div class="ci">
            <div class="ci__header">
                <svg class="search__icon" @click="addChapter">
                    <use xlink:href="../../../assets/img/all.svg#icon-check"></use>
                </svg>
                <div class="ci__header--text">
                    <label v-if="!courseNameEdit" for="">
                        <span v-if="!courseInfo.courseName">课程内容</span>
                        <span v-if="courseInfo.courseName">{{courseInfo.courseName}}</span>
                        
                    </label>
                    <input v-if="courseNameEdit"  v-model="courseName" type="text" name="courseName" id="courseName" placeholder="请输入课程名">
                </div>

                <div class="ci__header--tail">
                    <svg class="ci__header--tail--1" @click="addChapter">
                        <use xlink:href="../../../assets/img/all.svg#icon-circle-with-plus"></use>
                    </svg>
                    <svg class="ci__header--tail--2" @click="editCourseName">
                        <use xlink:href="../../../assets/img/all.svg#icon-edit"></use>
                    </svg>
                    <svg class="ci__header--tail--3" >
                        <use xlink:href="../../../assets/img/all.svg#icon-circle-with-minus"></use>
                    </svg>
                </div>
                
            </div>
            <div class="ci__list" v-for="(chapter,index) in chapterList" :key="index">
                <div class="ci__list__title">
                    <svg class="search__icon" >
                        <use xlink:href="../../../assets/img/all.svg#icon-check"></use>
                    </svg>
                    <div class="ci__list__title--text">
                        <label v-if="!chapterNameEdit" for="">
                            <span v-if="!courseInfo.chapterName">请输入章节名称</span>
                            <span v-if="courseInfo.chapterName">第{{index+1}}节：{{courseInfo.chapterName}}</span>
                        </label>
                        
                        <input v-if="chapterNameEdit"  v-model="chapterName" type="text" name="courseName" id="courseName" placeholder="请输入章节名">
                    </div>
                    <div class="ci__list__title--tail">
                        <svg class="ci__list__title--tail--1" @click="addContent(index)">
                            <use xlink:href="../../../assets/img/all.svg#icon-circle-with-plus"></use>
                        </svg>
                        <svg class="ci__list__title--tail--2" >
                            <use xlink:href="../../../assets/img/all.svg#icon-edit" @click="editChapterName(index)"></use>
                        </svg>
                        <svg class="ci__list__title--tail--3" >
                            <use xlink:href="../../../assets/img/all.svg#icon-circle-with-minus"></use>
                        </svg>
                    </div>
                    
                </div>
                <ul class="ci__list__nav">
                    <li class="ci__list__nav__item" v-for="(content,number) in chapterList[index].lessonList" :key="number">
                        <!-- <div class="ci__list__nav__item__layout"> -->
                            <svg class="user-nav__icon">
                                <use xlink:href="../../../assets/img/sprite2.svg#icon-bookmark"></use>
                            </svg>
                            <div class="link-item">
                                <label v-if="!lessonNameEdit"  for="">
                                    <span v-if="!courseInfo.lessonName">请输入课名</span>
                                    <span v-if="courseInfo.lessonName">第{{number+1}}课：{{courseInfo.lessonName}}</span>
                                </label>
                                <!-- <a href="#" class="ci__list__nav__link">第{{number+1}}课：{{content.title}}</a> -->

                                <input v-if="lessonNameEdit"  v-model="lessonName" type="text" name="courseName" id="courseName" placeholder="请输入课名">
                            </div>
                            <div class="ci__list__nav__item--tail">
                                <svg class="ci__list__nav__item--tail--2" >
                                    <use xlink:href="../../../assets/img/all.svg#icon-edit" @click="editLessonName(number)"></use>
                                </svg>
                                <svg class="ci__list__nav__item--tail--3" >
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
    data(){
        return {
            courseName:"",
            chapterName:"",
            lessonName:"",
            courseNameEdit:false,
            chapterNameEdit:false,
            lessonNameEdit:false,
            chapterList:[],
            lessonList:[],
            courseInfo:{}
        }
    },
    methods:{
        addChapter:function(){
            
            let chapterContent = {
                "title": "请输入章节名称",
                "timeDuration": 0,
                "index": 0,
                "lessonList":[]
            }
            this.chapterList.push(chapterContent);
        },
        addContent:function(parentIndex){
            console.log(parentIndex);
            let courseContent = {
                "timeDuration": 0,
                "index": 0,
                "parentIndex":parentIndex
            }
            this.chapterList[parentIndex].lessonList.push(courseContent);
        },
        editCourseName:function(){
            console.log("nimabi")
            this.courseNameEdit = !this.courseNameEdit;
            if(this.courseNameEdit===true){
                console.log("fuck ou")
            }else{
                this.courseInfo.courseName = this.courseName;
                this.courseName = "";
            }
        },
        editChapterName:function(){
            console.log("nimabi")
            this.chapterNameEdit = !this.chapterNameEdit;
            if(this.chapterNameEdit===true){
                console.log("fuck ou")
            }else{
                this.courseInfo.chapterName = this.chapterName;
                this.chapterName = "";
            }
        },
        editLessonName:function(){
            console.log("nimabi")
            this.lessonNameEdit = !this.lessonNameEdit;
            if(this.lessonNameEdit===true){
                console.log("fuck ou")
            }else{
                this.courseInfo.lessonName = this.lessonName;
                this.lessonName = "";
            }
        },

    }
}
</script>