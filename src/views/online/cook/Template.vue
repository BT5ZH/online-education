<template>
    <main class="rs-learning">
        <course-info></course-info>
        <div class="rs__select">
            <div class="rs__select__layout ">
                <div v-for="(file, index) in currentResource" :key="index" :class="[currentResource[index].editFlag?activeClass:'','rs__card']" @dblclick="matching(index)">
                    <svg v-if="currentResource[index].type.split('/').shift()=='video'" class="rs__card__extension rs__card__extension--1">
                        <use xlink:href="../../../assets/img/all.svg#icon-file-video"></use>
                    </svg>
                    <svg v-if="currentResource[index].type.split('/').shift()=='text'"  class="rs__card__extension rs__card__extension--1">
                        <use xlink:href="../../../assets/img/all.svg#icon-file-video"></use>
                    </svg>
                    
                    <h5 class="rs__card__name">{{currentResource[index].name}}</h5>
                </div>
                
            </div>
            <info-block></info-block>
            <div class="rs__select__area">
                <div class="process__btn rs__select__area__btn">
                    <btn class="process__btn__link">放弃</btn>
                  </div>
                  <div class="process__btn rs__select__area__btn">
                    <btn class="process__btn__link">保存</btn>
                  </div>
                  <div class="process__btn rs__select__area__btn">
                    <btn class="process__btn__link" @click="releaseCourse">发布</btn>
                  </div>
            </div>
        </div>
    </main>
</template>
<script>
    import CourseInfo from './CourseInfo';
    import InfoBlock from './InfoBlock';
    export default {
        data() {
            return {
                activeClass: 'rs__card--edit',
            }
        },
        computed: {
            currentResource() {
                return this.$store.state.resourceList;
            },
            courseProfile(){
                return this.$store.state.courseInfo;
            }
        },
        created() {
            this.$store.dispatch("getResources").then(() => {
                    console.log("-----------");
                }).catch((err) => {
                    console.error(err);
                });
        },
        components: {
            'course-info': CourseInfo,
            'info-block': InfoBlock
        },
        methods: {
            matching:function(index){
                console.log("dbclick")
                // this.rsArray[index].editFlag = true;

                let payload = {
                    index:index
                }
                this.$store.dispatch("prepareMatching", payload).then(() => {
                    console.log("准备配对标志成功返回");
                }).catch((err) => {
                    console.error(err);
                });
            },
            releaseCourse:function(){
                let payload = this.courseProfile;
                this.$store.dispatch("releaseCourse",payload).then(() => {
                    console.log("课程发布标志成功返回");
                }).catch((err) => {
                    console.error(err);
                });
            }
        },
    }
</script>