import * as TYPES from "./mutation-types";

const mutations ={
    [TYPES.authUser](state, userData) {
        state.token = userData.token;
        state.userId = userData.userId;
        state.roleId = userData.roleId;
        state.expirationDate = userData.expirationDate;
    },
    [TYPES.courseInfo](state, userData) {
        console.log("mutation进来啦 "+userData.coverUrl);
        state.tempRsUrl = userData.coverUrl;
        
    },
    [TYPES.updateCourseName](state, payload) {
        console.log("updateCourseName + mutation 进来啦"+payload.courseName);
        state.courseInfo.COURSE_NAME = payload.courseName;
        
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
        const newLesson = {
            ...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number], 
            LESSON_RESOURCE_ID:state.resourceList[state.currentResourceIndex].id,
            LESSON_RESOURCE_NAME:state.resourceList[state.currentResourceIndex].name,
            LESSON_RESOURCE_SIZE:state.resourceList[state.currentResourceIndex].size,
            LESSON_RESOURCE_TYPE:state.resourceList[state.currentResourceIndex].type,
            LESSON_RESOURCE_URL:state.resourceList[state.currentResourceIndex].url
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
    [TYPES.learningTheCourse](state,payload){
        console.log("learningTheCourse + mutation 进来啦 "+state.currentResourceIndex);
        state.learningCourseInfo = payload;
    },
    [TYPES.showCurrentLesson](state,payload){
        console.log("showCurrentLesson + mutation 进来啦 "+state.currentResourceIndex);
        // state.learningCourseInfo = payload;
        state.currentLessonRSUrl= state.learningCourseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number].LESSON_RESOURCE_URL;
    },
}
export default mutations;