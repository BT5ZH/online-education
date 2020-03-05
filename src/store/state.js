const state = {

    token: "",
    userId: "",
    roleId:"",
    expirationDate:"",
    //courseInfo--state
    courseInfo:{
        courseId:"",
        courseName:"",
        courseSummary:"",
        courseAnnounccement:"",
        courseCoverUrl:"",
        courseCreateTime:"",
        chapterList:[]
    },
    // Chapter:{
    //     chapterName:"",
    //     lessonList:[],

    // } ,
    // Lesson:{
    //     lessonName:"",
    //     lessonTimeDuration:"",
    //     lessonResourceType:"",
    //     lessonResourceUrl:"",
    //     lessonResourceCover:"",
    //     lessonAssignment:"",
    //     lessonQuestionList:[],
    // },
    resourceList:[],
    currentResourceIndex:-1
}

export default state