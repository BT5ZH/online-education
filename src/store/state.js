const state = {

    token: "",
    userId: "",
    roleId:"",
    expirationDate:"",
    //create course info detail
    courseInfo:{
        COURSE_NAME:"",
        COURSE_SUMMARY:"test for default",
        COURSE_ANNOUNCCEMENT:"waiting",
        COURSE_COVERURL:"http://lalalalallalalala",
        COURSE_STATUS:"pending",
        CHAPTER_LIST:[]
    },
    //
    courseShortList:{},
    courseAllList:{},
    //     lessonAssignment:"",
    //     lessonQuestionList:[],
    resourceList:[],
    currentResourceIndex:-1
}

export default state