const state = {

    token: "",
    userId: "",
    roleId:"",
    expirationDate:"",

    //创建课程时候，用于存放正在创建的课程 的 所有信息的 课程对象
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
    learningCourseInfo:{},
    currentLessonRSUrl:"",
    //     lessonAssignment:"",
    //     lessonQuestionList:[],
    resourceList:[],
    currentResourceIndex:-1
}

export default state