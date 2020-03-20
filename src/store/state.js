const state = {
    token: "",
    userId: "",
    roleId:"",
    expirationDate:"",
    //
    dataLoading:false,

    //创建课程时候，用于存放正在创建的课程 的 所有信息的 课程对象
    courseInfo:{
        COURSE_NAME:"",
        COURSE_SUMMARY:"test for default",
        COURSE_ANNOUNCEMENT:"waiting",
        COURSE_COVERURL:"http://lalalalallalalala",
        COURSE_STATUS:"pending",
        CHAPTER_LIST:[]
    },

    //创建好的课程的列表信息---作者身份用
    courseShortList:{},

    //用户选择或加入的课程列表信息--用户身份用
    myCoursesShortList:{},

    //查询出来所有课程的列表信息--所有课程页面
    courseAllList:{},

    //正在学习的课程页面
    learningCourseInfo:{},


    currentLessonRSUrl:"",
    //     lessonAssignment:"",
    //     lessonQuestionList:[],
    resourceList:[],
    currentResourceIndex:-1,

    // 用户个人情报
    userProfile: {
        REAL_NAME:"",
        COMPANY:"",
        DEPARTMENT:"",
        TITLE:"",
        COMPANY_ID:"",
        EMAIL:"",
        MOBILE:"",
        BIRTHDAY:""
    }
}

export default state