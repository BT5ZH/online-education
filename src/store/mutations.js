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
        console.log("lockResource + mutation 进来啦 "+state.currentResourceIndex+" lalal");
        const newLesson = {
            ...state.courseInfo.chapterList[payload.index].lessonList[payload.number], 
            resourceId:state.resourceList[state.currentResourceIndex].id,
            resourceName:state.resourceList[state.currentResourceIndex].name,
            resourceSize:state.resourceList[state.currentResourceIndex].size,
            resourceType:state.resourceList[state.currentResourceIndex].type,
            resourceUrl:state.resourceList[state.currentResourceIndex].url
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
    [TYPES.getUserCourses](state){
        console.log("getUserCourses + mutation 进来啦 "+state.currentResourceIndex);
    },
    [TYPES.learningTheCourse](state){
        console.log("learningTheCourse + mutation 进来啦 "+state.currentResourceIndex);
    },
}
export default mutations;