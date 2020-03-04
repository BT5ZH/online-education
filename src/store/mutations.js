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
        state.courseInfo.courseName = payload.courseName;
        
    },

    [TYPES.addChapter](state, chapter) {
        console.log("addChapter + mutation 进来啦 "+chapter);
        console.log("addChapter + mutation 进来啦 "+JSON.stringify(chapter));
        state.courseInfo.chapterList.push(chapter);
    },

    [TYPES.updateChapterName](state, payload) {
        console.log("updateChapterName + mutation 进来啦 "+payload.chapterName);

        const newChapter = {
            ...state.courseInfo.chapterList[payload.index],chapterName:payload.chapterName
        }
        console.log("updateChapterName + mutation newChapter "+JSON.stringify(newChapter));
        state.courseInfo.chapterList[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.chapterList];
        console.log("updateChapterName + mutation newChapter "+newChapterList);
        let newCourse = {
            ...state.courseInfo, chapterList:newChapterList
        }
        state.courseInfo = newCourse;
    },

    [TYPES.updateChapterEditFlag](state, payload) {
        const newChapter = {
            ...state.courseInfo.chapterList[payload.index],editFlag:!state.courseInfo.chapterList[payload.index].editFlag
        }
        console.log("updateChapterEditFlag + mutation newChapter "+JSON.stringify(newChapter));
        state.courseInfo.chapterList[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.chapterList];
        console.log("updateChapterEditFlag + mutation newChapter "+newChapterList);
        let newCourse = {
            ...state.courseInfo, chapterList:newChapterList
        }
        state.courseInfo = newCourse;
    },

    [TYPES.addLesson](state, payload) {
        console.log("addLesson + mutation 进来啦 "+payload.lesson);
        console.log("addLesson + mutation 进来啦 "+JSON.stringify(payload.lesson));
        state.courseInfo.chapterList[payload.chapterIndex].lessonList.push(payload.lesson);
    },

    [TYPES.updateLessonName](state, payload) {
        console.log("updatelessonName + mutation 进来啦 "+payload.lessonName);
        const newLesson = {
            ...state.courseInfo.chapterList[payload.index].lessonList[payload.number],lessonName:payload.lessonName
        }
        state.courseInfo.chapterList[payload.index].lessonList[payload.number] = newLesson;
        const newLessonList = [...state.courseInfo.chapterList[payload.index].lessonList];
        const newChapter = {
            ...state.courseInfo.chapterList[payload.index],lessonList:newLessonList
        }
        state.courseInfo.chapterList[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.chapterList];
        let newCourse = {
            ...state.courseInfo, chapterList:newChapterList
        }
        state.courseInfo = newCourse;        
    },

    [TYPES.updateLessonEditFlag](state, payload) {
        // console.log("updatelessonName + mutation 进来啦 "+payload.lessonName);
        const newLesson = {
            ...state.courseInfo.chapterList[payload.index].lessonList[payload.number], 
            editFlag:!state.courseInfo.chapterList[payload.index].lessonList[payload.number].editFlag
        }
        state.courseInfo.chapterList[payload.index].lessonList[payload.number] = newLesson;
        const newLessonList = [...state.courseInfo.chapterList[payload.index].lessonList];
        const newChapter = {
            ...state.courseInfo.chapterList[payload.index],lessonList:newLessonList
        }
        state.courseInfo.chapterList[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.chapterList];
        let newCourse = {
            ...state.courseInfo, chapterList:newChapterList
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
        console.log("lockResource + mutation 进来啦 ");
        const newLesson = {
            ...state.courseInfo.chapterList[payload.index].lessonList[payload.number], 
            resourceId:!state.courseInfo.resourceList[payload.index].id,
            resourceName:!state.courseInfo.resourceList[payload.index].name,
            resourceSize:!state.courseInfo.resourceList[payload.index].size,
            resourceType:!state.courseInfo.resourceList[payload.index].type,
            resourceUrl:!state.courseInfo.resourceList[payload.index].url
        }
        state.courseInfo.chapterList[payload.index].lessonList[payload.number] = newLesson;
        const newLessonList = [...state.courseInfo.chapterList[payload.index].lessonList];
        const newChapter = {
            ...state.courseInfo.chapterList[payload.index],lessonList:newLessonList
        }
        state.courseInfo.chapterList[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.chapterList];
        let newCourse = {
            ...state.courseInfo, chapterList:newChapterList
        }
        state.courseInfo = newCourse;
    },
    [TYPES.releaseCourse](state){
        console.log("releaseCourse + mutation 进来啦 "+state.currentResourceIndex);
    },
    [TYPES.getUserCourses](state){
        console.log("getUserCourses + mutation 进来啦 "+state.currentResourceIndex);
    },
    [TYPES.learningTheCourse](state){
        console.log("learningTheCourse + mutation 进来啦 "+state.currentResourceIndex);
    },
}
export default mutations;