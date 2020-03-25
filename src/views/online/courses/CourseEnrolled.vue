<template>
    <div class="enrolled">
       <div class="enrolled__header">
            <div class="enrolled__header__number">
                <h3 class="enrolled__header__number--txt">{{enrolledMember.length}}</h3>
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
               <div class="enrolled__content__l__progress" v-for="(student,index) in studentList" :key="index">
                   <div class="enrolled__content__l__progress--image">
                       <img src="../../../assets/img/user.jpg" alt="" @click="shortInfoShow(index)">
                       <div class="enrolled__content__l__progress--short">
                           {{student.name}}
                       </div>
                   </div>
                   <div class="enrolled__content__l__progress--bar">
                       <div class="enrolled__content__l__progress--bar--in" :style="{'width':enrolledMember[index].age}"></div>
                   </div>
               </div>
           </div>
           <div class="enrolled__content__r"></div>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            enrolledMember: [],
            enrolledMemberProgress:[
            ]
        }
    },
    computed: {
        studentList(){
           return this.enrolledMember
        }
    },
    created() {
        this.enrolledMember= [
                {name:"zhang",age:"66%"},
                {name:"wang",age:"90%"},
                {name:"li",age:"45%"},
                {name:"zhao",age:"22%"},
                {name:"wang",age:"90%"},
                {name:"li",age:"45%"},
                {name:"zhao",age:"22%"},
                {name:"wang",age:"90%"},
                {name:"li",age:"45%"},
                {name:"zhao",age:"22%"},
                {name:"wang",age:"90%"},
                {name:"li",age:"45%"},
                {name:"zhao",age:"22%"},
                {name:"wang",age:"90%"},
                {name:"li",age:"45%"},
                {name:"zhao",age:"22%"},
            ];
            this.$store.dispatch("getCourseStsInfo").then(() => {
                console.log("课程统计信息");
            }).catch((err) => {
                console.error(err);
            });
    },
    methods: {
        shortInfoShow:function(index){
            console.log(index);

        }
    },
}
</script>