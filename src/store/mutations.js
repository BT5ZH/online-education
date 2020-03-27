import * as TYPES from "./mutation-types";

const mutations ={
    [TYPES.authUser](state, userData) {
        state.token = userData.token;
        state.userId = userData.userId;
        state.roleId = userData.roleId;
        state.expirationDate = userData.expirationDate;
    },
    [TYPES.unAuthUser](state) {
        state.token = null;
        state.userId = null;
        state.roleId = null;
        state.expirationDate = null;
    },
    [TYPES.dataLoading](state,payload){
        state.dataLoading = payload;
        console.log(state.dataLoading)
    },
    [TYPES.courseInfo](state, userData) {
        console.log("mutation进来啦 "+userData.coverUrl);
        state.tempRsUrl = userData.coverUrl;
        
    },
    [TYPES.updateCourseName](state, payload) {
        console.log("updateCourseName + mutation 进来啦"+payload.courseName);
        state.courseInfo.COURSE_NAME = payload.courseName;  
    },
    [TYPES.updateCourseStatus](state, payload) {
        console.log("updateCourseStatus + mutation 进来啦"+payload.courseStatus);
        state.courseInfo.COURSE_STATUS = payload.courseStatus;  
    },
    [TYPES.updateCourseSummary](state, payload) {
        console.log("updateCourseSummary + mutation 进来啦"+payload.courseSummary);
        state.courseInfo.COURSE_SUMMARY = payload.courseSummary;  
    },
    [TYPES.updateCourseAnnouncement](state, payload) {
        console.log("updateCourseAnnouncement + mutation 进来啦"+payload.courseAnnouncement);
        state.courseInfo.COURSE_ANNOUNCEMENT = payload.courseAnnouncement;  
    },
    [TYPES.addChapter](state, chapter) {
        console.log("addChapter + mutation 进来啦 "+chapter);
        console.log("addChapter + mutation 进来啦 "+JSON.stringify(chapter));
        state.courseInfo.CHAPTER_LIST.push(chapter);
    },

    [TYPES.updateChapterName](state, payload) {
        console.log("updateChapterName + mutation 进来啦 "+payload.chapterName);

        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index],CHAPTER_NAME:payload.chapterName
        }
        console.log("updateChapterName + mutation newChapter "+JSON.stringify(newChapter));
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        console.log("updateChapterName + mutation newChapter "+newChapterList);
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST:newChapterList
        }
        state.courseInfo = newCourse;
    },

    [TYPES.updateChapterEditFlag](state, payload) {
        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index],CHAPTER_EDITFLAG:!state.courseInfo.CHAPTER_LIST[payload.index].CHAPTER_EDITFLAG
        }
        console.log("updateChapterEditFlag + mutation newChapter "+JSON.stringify(newChapter));
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        console.log("updateChapterEditFlag + mutation newChapter "+newChapterList);
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST:newChapterList
        }
        state.courseInfo = newCourse;
    },

    [TYPES.addLesson](state, payload) {
        console.log("addLesson + mutation 进来啦 "+payload.lesson);
        console.log("addLesson + mutation 进来啦 "+JSON.stringify(payload.lesson));
        state.courseInfo.CHAPTER_LIST[payload.chapterIndex].LESSON_LIST.push(payload.lesson);
    },

    [TYPES.updateLessonName](state, payload) {
        console.log("updatelessonName + mutation 进来啦 "+payload.lessonName);
        const newLesson = {
            ...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number],LESSON_NAME:payload.lessonName
        }
        state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number] = newLesson;
        const newLessonList = [...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST];
        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index],LESSON_LIST:newLessonList
        }
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST:newChapterList
        }
        state.courseInfo = newCourse;        
    },

    [TYPES.updateLessonEditFlag](state, payload) {
        // console.log("updatelessonName + mutation 进来啦 "+payload.lessonName);
        const newLesson = {
            ...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number], 
            LESSON_EDITFLAG:!state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number].LESSON_EDITFLAG
        }
        state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number] = newLesson;
        const newLessonList = [...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST];
        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index],LESSON_LIST:newLessonList
        }
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST:newChapterList
        }
        state.courseInfo = newCourse;        
    },
    [TYPES.prepareMatching](state, payload) {
        state.currentResourceIndex = payload.index;
        const newResource = {
            ...state.resourceList[payload.index], editFlag : !state.resourceList[payload.index].editFlag
        }
        state.resourceList[payload.index] = newResource;
        const newResourceList = [...state.resourceList];
        state.resourceList=newResourceList;
    },
    [TYPES.getResources](state,payload) {
        console.log("getResources + mutation 进来啦 ");
        const newList = [...payload.Items];
        state.resourceList = newList;
    },
    [TYPES.lockResource](state,payload) {
        console.log("lockResource + mutation 进来啦 "+state.currentResourceIndex+" lalal");

        const matching = {
            RS_ID:payload.id,
            RS_TAG:[]
        }
        const newLesson = {
            ...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number], 
            LESSON_RESOURCE_ID:state.resourceList[state.currentResourceIndex].id,
            LESSON_RESOURCE_NAME:state.resourceList[state.currentResourceIndex].name,
            LESSON_RESOURCE_SIZE:state.resourceList[state.currentResourceIndex].size,
            LESSON_RESOURCE_TYPE:state.resourceList[state.currentResourceIndex].type,
            LESSON_RESOURCE_URL:state.resourceList[state.currentResourceIndex].url,
            LESSON_TIMEDURATION:state.resourceList[state.currentResourceIndex].RS_DURATION,
            RS:matching
        }
        state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number] = newLesson;
        const newLessonList = [...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST];
        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index],LESSON_LIST:newLessonList
        }
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST:newChapterList
        }
        state.courseInfo = newCourse;

        //完成关联之后恢复状态标志 
        //资源列表中当前选中资源编辑状态 重置为false 完成标志重置为trues
        const tagContent = {
            userId : state.userId,
            courseName: state.courseInfo.COURSE_NAME,
            chapterIndex: payload.index,
            lessonId:payload.number,
        }
        const tagList = [...state.resourceList[state.currentResourceIndex].RS_TAG, tagContent];
        const newResource = {
            ...state.resourceList[state.currentResourceIndex], 
            editFlag : !state.resourceList[state.currentResourceIndex].editFlag,
            RS_TAG : tagList
        }
        state.resourceList[state.currentResourceIndex] = newResource;
        const newResourceList = [...state.resourceList];
        state.resourceList=newResourceList;

        //资源列表中当前选中资源索引 重置为-1
        state.currentResourceIndex = -1;
    },
    [TYPES.lockCover](state,payload){
        console.log("lockCover + mutation 进来啦 "+state.currentResourceIndex+" lalal");
        let newCourse = {
            ...state.courseInfo, COURSE_COVERURL:payload.url
        }
        state.courseInfo = newCourse;

        //完成关联之后恢复状态标志 
        //资源列表中当前选中资源编辑状态 重置为false 完成标志重置为trues
        const tagContent = {
            userId : state.userId
        }
        const tagList = [...state.resourceList[state.currentResourceIndex].RS_TAG, tagContent];
        const newResource = {
            ...state.resourceList[state.currentResourceIndex], 
            editFlag : !state.resourceList[state.currentResourceIndex].editFlag,
            RS_TAG : tagList
        }
        state.resourceList[state.currentResourceIndex] = newResource;
        const newResourceList = [...state.resourceList];
        state.resourceList=newResourceList;

        //资源列表中当前选中资源索引 重置为-1
        state.currentResourceIndex = -1;
    },
    [TYPES.releaseCourse](state){
        console.log("releaseCourse + mutation 进来啦 "+state.currentResourceIndex);
    },
    [TYPES.getUserCourses](state,payload){
        console.log("getUserCourses + mutation 进来啦 "+state.currentResourceIndex);
        state.courseShortList = payload
    },
    [TYPES.getAllCourses](state,payload){
        console.log("getAllCourses + mutation 进来啦 "+state.currentResourceIndex);
        state.courseAllList = payload
    },
    [TYPES.getMyCourses](state,payload){
        console.log("getAllCourses + mutation 进来啦 "+state.currentResourceIndex);
        state.myCoursesShortList = payload;
    },
    [TYPES.learningTheCourse](state,payload){
        console.log("learningTheCourse + mutation 进来啦 "+state.currentResourceIndex);
        state.learningCourseInfo = payload;
    },
    [TYPES.editTheCourse](state,payload){
        console.log("editTheCourse + mutation 进来啦 "+state.currentResourceIndex);
        state.courseInfo = payload;
    },
    [TYPES.showCurrentLesson](state,payload){
        console.log("showCurrentLesson + mutation 进来啦 "+state.currentResourceIndex);
        // state.learningCourseInfo = payload;
        state.currentLessonRSUrl= state.learningCourseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number].LESSON_RESOURCE_URL;
    },
    [TYPES.backToCookTop](state,payload){
        state. courseInfo = payload;
    },
    [TYPES.selectToLearn](state,payload){
        console.log("selectToLearn + mutation 进来啦 "+state.myCoursesShortList);
        console.log("selectToLearn + mutation 进来啦 "+payload);
    },
    [TYPES.updateRealName](state, payload) {
        console.log("updateRealName + mutation 进来啦"+payload.realName);
        state.userProfile.NAME = payload.realName;  
    },
    [TYPES.updateCompany](state, payload) {
        console.log("updateCompany + mutation 进来啦"+payload.company);
        state.userProfile.COMPANY = payload.company;  
    },
    [TYPES.updateDepartment](state, payload) {
        console.log("updateDepartment + mutation 进来啦"+payload.department);
        state.userProfile.DEPARTMENT = payload.department;  
    },
    [TYPES.updateMajor](state, payload) {
        console.log("updateMajor + mutation 进来啦"+payload.major);
        state.userProfile.MAJOR = payload.major;  
    },
    [TYPES.updateTitle](state, payload) {
        console.log("updateTitle + mutation 进来啦"+payload.title);
        state.userProfile.TITLE = payload.title;  
    },
    [TYPES.updateCid](state, payload) {
        console.log("updateCid + mutation 进来啦"+payload.cid);
        state.userProfile.COMPANY_ID = payload.cid;  
    },
    [TYPES.updateEmail](state, payload) {
        console.log("updateEmail + mutation 进来啦"+payload.email);
        state.userProfile.EMAIL = payload.email;  
    },
    [TYPES.updateMobile](state, payload) {
        console.log("updateMobile + mutation 进来啦"+payload.mobile);
        state.userProfile.MOBILE = payload.mobile;  
    },
    [TYPES.updateIndividual](state, payload) {
        console.log("updateIndividual + mutation 进来啦"+payload);
        state.userProfile = payload;  
    },
    [TYPES.getUserProfile](state, payload) {
        console.log("getUserProfile + mutation 进来啦"+payload);
        state.userProfile = payload;  
    },
    [TYPES.getCourseStsInfo](state, payload) {
        console.log("getCourseStsInfo + mutation 进来啦"+payload);
        state.courseStsInfo = payload;  
    },
    [TYPES.updateLearningActivity](state, payload) {
        console.log("updateLearningActivity + mutation 进来啦"+payload);
        state.learningActivity = payload;  
    },
    //支付课程
    [TYPES.updatePayCourse](state, payload) {
        console.log("updatePayCourse + mutation 进来啦"+payload);
        state.payCourse = payload;  
    },
}
export default mutations;