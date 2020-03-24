<template>
    <div class="enrolled">
       <div class="enrolled__header">
           lalala
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
    },
    methods: {
        shortInfoShow:function(index){
            console.log(index);

        }
    },
}
</script>