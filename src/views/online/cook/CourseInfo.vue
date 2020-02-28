<template lang="">
    <div class="course__info">
        <div class="cs">
            <div class="cs__header">
                <span class="cs__header-text">课程内容</span>
                <svg class="search__icon" @click="addChapter">
                    <use xlink:href="../../../assets/img/sprite.svg#icon-key"></use>
                </svg>
            </div>
            <div class="cs__list" v-for="(chapter,index) in chapterList" :key="index">
                <div class="cs__list__title">
                    <div class="cs__list__title--text">
                        <span>第{{index+1}}节：{{chapter.title}}</span>
                        <span class="heading-7 heading-7--dark">&nbsp; {{chapter.timeDuration}} &nbsp;分钟&nbsp;</span>
                    </div>

                    <svg class="search__icon" @click="addContent(index)">
                        <use xlink:href="../../../assets/img/sprite.svg#icon-key"></use>
                    </svg>
                </div>
                <ul class="cs__list__nav">
                    <li class="cs__list__nav__item" v-for="(content,number) in contentList" :key="number">
                        <svg class="user-nav__icon">
                            <use xlink:href="../../../assets/img/sprite2.svg#icon-bookmark"></use>
                        </svg>
                        <div class="link-item">
                            <a href="#" class="cs__list__nav__link">{{number}}.{{content.title}}</a>
                            <span class="heading-7 heading-7--dark">{{content.timeDuration}}分钟</span>
                        </div>

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
            chapterList:[],
            contentList:[]

        }
    },
    methods:{
        addChapter:function(){
            
            let chapterContent = {
                "title": "请输入章节名称",
                "timeDuration": 0,
                "index": 0,
                "contenList":[]
            }
            this.chapterList.push(chapterContent);
            console.log("chapterList")
        },
        addContent:function(index){
            
            let courseContent = {
                "title": "请输入每一课名称",
                "timeDuration": 0,
                "index": 0
            }
            console.log(index);
            this.contentList.push(courseContent);

            // this.chapterList[0].contenList.push({"1"});
            
            console.log(this.chapterList)
        }
    }
}
</script>