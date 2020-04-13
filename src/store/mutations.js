import * as TYPES from "./mutation-types";

const mutations = {
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
    [TYPES.dataLoading](state, payload) {
        state.dataLoading = payload;
    },
    [TYPES.courseInfo](state, userData) {
        console.log("mutation进来啦 " + userData.coverUrl);
        state.tempRsUrl = userData.coverUrl;

    },
    [TYPES.updateCourseName](state, payload) {
        console.log("updateCourseName + mutation 进来啦" + payload.courseName);
        state.courseInfo.COURSE_NAME = payload.courseName;
    },
    [TYPES.updateCourseStatus](state, payload) {
        console.log("updateCourseStatus + mutation 进来啦" + payload.courseStatus);
        state.courseInfo.COURSE_STATUS = payload.courseStatus;
    },
    [TYPES.updateCourseSummary](state, payload) {
        console.log("updateCourseSummary + mutation 进来啦" + payload.courseSummary);
        state.courseInfo.COURSE_SUMMARY = payload.courseSummary;
    },
    [TYPES.updateCourseAnnouncement](state, payload) {
        console.log("updateCourseAnnouncement + mutation 进来啦" + payload.courseAnnouncement);
        state.courseInfo.COURSE_ANNOUNCEMENT = payload.courseAnnouncement;
    },
    [TYPES.addChapter](state, chapter) {
        console.log("addChapter + mutation 进来啦 " + chapter);
        console.log("addChapter + mutation 进来啦 " + JSON.stringify(chapter));
        state.courseInfo.CHAPTER_LIST.push(chapter);
    },

    [TYPES.updateChapterName](state, payload) {
        console.log("updateChapterName + mutation 进来啦 " + payload.chapterName);

        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index], CHAPTER_NAME: payload.chapterName
        }
        console.log("updateChapterName + mutation newChapter " + JSON.stringify(newChapter));
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        console.log("updateChapterName + mutation newChapter " + newChapterList);
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST: newChapterList
        }
        state.courseInfo = newCourse;
    },

    [TYPES.updateChapterEditFlag](state, payload) {
        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index], CHAPTER_EDITFLAG: !state.courseInfo.CHAPTER_LIST[payload.index].CHAPTER_EDITFLAG
        }
        console.log("updateChapterEditFlag + mutation newChapter " + JSON.stringify(newChapter));
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        console.log("updateChapterEditFlag + mutation newChapter " + newChapterList);
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST: newChapterList
        }
        state.courseInfo = newCourse;
    },

    [TYPES.addLesson](state, payload) {
        console.log("addLesson + mutation 进来啦 " + payload.lesson);
        console.log("addLesson + mutation 进来啦 " + JSON.stringify(payload.lesson));
        state.courseInfo.CHAPTER_LIST[payload.chapterIndex].LESSON_LIST.push(payload.lesson);
    },

    [TYPES.updateLessonName](state, payload) {
        console.log("updatelessonName + mutation 进来啦 " + payload.lessonName);
        const newLesson = {
            ...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number], LESSON_NAME: payload.lessonName
        }
        state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number] = newLesson;
        const newLessonList = [...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST];
        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index], LESSON_LIST: newLessonList
        }
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST: newChapterList
        }
        state.courseInfo = newCourse;
    },

    [TYPES.updateLessonEditFlag](state, payload) {
        // console.log("updatelessonName + mutation 进来啦 "+payload.lessonName);
        const newLesson = {
            ...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number],
            LESSON_EDITFLAG: !state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number].LESSON_EDITFLAG
        }
        state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number] = newLesson;
        const newLessonList = [...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST];
        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index], LESSON_LIST: newLessonList
        }
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST: newChapterList
        }
        state.courseInfo = newCourse;
    },
    [TYPES.prepareMatching](state, payload) {
        state.currentResourceIndex = payload.index;
        const newResource = {
            ...state.resourceList[payload.index], editFlag: !state.resourceList[payload.index].editFlag
        }
        state.resourceList[payload.index] = newResource;
        const newResourceList = [...state.resourceList];
        state.resourceList = newResourceList;
    },
    [TYPES.getResources](state, payload) {
        console.log("getResources + mutation 进来啦 ");
        const newList = [...payload.Items];
        state.resourceList = newList;
    },
    [TYPES.lockResource](state, payload) {
        console.log("lockResource + mutation 进来啦 " + state.currentResourceIndex + " lalal");

        const matching = {
            RS_ID: payload.id,
            RS_TAG: []
        }
        const newLesson = {
            ...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number],
            LESSON_RESOURCE_ID: state.resourceList[state.currentResourceIndex].id,
            LESSON_RESOURCE_NAME: state.resourceList[state.currentResourceIndex].name,
            LESSON_RESOURCE_SIZE: state.resourceList[state.currentResourceIndex].size,
            LESSON_RESOURCE_TYPE: state.resourceList[state.currentResourceIndex].type,
            LESSON_RESOURCE_URL: state.resourceList[state.currentResourceIndex].url,
            LESSON_TIMEDURATION: state.resourceList[state.currentResourceIndex].RS_DURATION,
            RS: matching
        }
        state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number] = newLesson;
        const newLessonList = [...state.courseInfo.CHAPTER_LIST[payload.index].LESSON_LIST];
        const newChapter = {
            ...state.courseInfo.CHAPTER_LIST[payload.index], LESSON_LIST: newLessonList
        }
        state.courseInfo.CHAPTER_LIST[payload.index] = newChapter;
        const newChapterList = [...state.courseInfo.CHAPTER_LIST];
        let newCourse = {
            ...state.courseInfo, CHAPTER_LIST: newChapterList
        }
        state.courseInfo = newCourse;

        //完成关联之后恢复状态标志 
        //资源列表中当前选中资源编辑状态 重置为false 完成标志重置为trues
        const tagContent = {
            userId: state.userId,
            courseName: state.courseInfo.COURSE_NAME,
            chapterIndex: payload.index,
            lessonId: payload.number,
        }
        const tagList = [...state.resourceList[state.currentResourceIndex].RS_TAG, tagContent];
        const newResource = {
            ...state.resourceList[state.currentResourceIndex],
            editFlag: !state.resourceList[state.currentResourceIndex].editFlag,
            RS_TAG: tagList
        }
        state.resourceList[state.currentResourceIndex] = newResource;
        const newResourceList = [...state.resourceList];
        state.resourceList = newResourceList;

        //资源列表中当前选中资源索引 重置为-1
        state.currentResourceIndex = -1;
    },
    [TYPES.lockCover](state, payload) {
        console.log("lockCover + mutation 进来啦 " + state.currentResourceIndex + " lalal");
        let newCourse = {
            ...state.courseInfo, COURSE_COVERURL: payload.url
        }
        state.courseInfo = newCourse;

        //完成关联之后恢复状态标志 
        //资源列表中当前选中资源编辑状态 重置为false 完成标志重置为trues
        const tagContent = {
            userId: state.userId
        }
        const tagList = [...state.resourceList[state.currentResourceIndex].RS_TAG, tagContent];
        const newResource = {
            ...state.resourceList[state.currentResourceIndex],
            editFlag: !state.resourceList[state.currentResourceIndex].editFlag,
            RS_TAG: tagList
        }
        state.resourceList[state.currentResourceIndex] = newResource;
        const newResourceList = [...state.resourceList];
        state.resourceList = newResourceList;

        //资源列表中当前选中资源索引 重置为-1
        state.currentResourceIndex = -1;
    },
    [TYPES.releaseCourse](state) {
        console.log("releaseCourse + mutation 进来啦 " + state.currentResourceIndex);
    },
    [TYPES.addLessonIndex](state) {
        console.log("addLessonIndex + mutation 进来啦 " + state.currentResourceIndex);
        let counter = 0;
        let courseDuration = 0;
        let chapterNumber = 0;
        state.courseInfo.CHAPTER_LIST.forEach(element => {
            let chapterDuration = 0;

            element.LESSON_LIST.forEach(element => {
                element.LESSON_INDEX = counter + 1;
                chapterDuration += element.LESSON_TIMEDURATION;
                counter++;
            })
            element.CHAPTER_TIMEDURATION = chapterDuration;
            courseDuration += chapterDuration;
            chapterNumber++;
        });
        state.courseInfo.COURSE_TIMEDURATION = courseDuration;
        state.courseInfo.COURSE_TOTALLESSON = counter;
        state.courseInfo.COURSE_CHAPTERNUMBER = chapterNumber;
        counter = 0;
        courseDuration = 0;
    },
    [TYPES.getUserCourses](state, payload) {
        console.log("getUserCourses + mutation 进来啦 " + state.currentResourceIndex);
        state.courseShortList = payload
    },
    [TYPES.getAllCourses](state, payload) {
        console.log("getAllCourses + mutation 进来啦 " + state.currentResourceIndex);
        state.courseAllList = payload
    },
    [TYPES.getMyCourses](state, payload) {
        console.log("getAllCourses + mutation 进来啦 " + state.currentResourceIndex);
        state.myCoursesShortList = payload;
    },
    [TYPES.learningTheCourse](state, payload) {
        console.log("learningTheCourse + mutation 进来啦 " + state.currentResourceIndex);
        state.learningCourseInfo = payload.courseDetail;
        // state.courseLearningStatusRead = payload.courseProgress;
        state.courseLearningStatus = payload.courseProgress;
    },
    [TYPES.initLearningStatus](state, payload) {
        console.log("initLearningStatus + mutation 进来啦 ");

        let progress = []
        let temp = {}
        for (let i = 0; i < payload.counter; i++) {
            progress.push(temp)
        }

        state.courseLearningStatus = [...progress];
    },
    [TYPES.editTheCourse](state, payload) {
        console.log("editTheCourse + mutation 进来啦 " + state.currentResourceIndex);
        state.courseInfo = payload;
    },
    [TYPES.showCurrentLesson](state, payload) {
        console.log("showCurrentLesson + mutation 进来啦 " + state.currentResourceIndex);
        // state.learningCourseInfo = payload;
        state.currentLessonRSUrl = state.learningCourseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number].LESSON_RESOURCE_URL;
        state.currentLessonIndex.index = state.learningCourseInfo.CHAPTER_LIST[payload.index].LESSON_LIST[payload.number].LESSON_INDEX;
        state.currentLessonIndex.chapter = payload.index + 1;
        state.currentLessonIndex.lesson = payload.number + 1;
    },
    [TYPES.backToCookTop](state, payload) {
        state.courseInfo = payload;
    },
    [TYPES.selectToLearn](state, payload) {
        console.log("selectToLearn + mutation 进来啦 " + state.myCoursesShortList);
        console.log("selectToLearn + mutation 进来啦 " + payload);
    },
    [TYPES.updateRealName](state, payload) {
        console.log("updateRealName + mutation 进来啦" + payload.realName);
        state.userProfile.NAME = payload.realName;
    },
    [TYPES.updateCompany](state, payload) {
        console.log("updateCompany + mutation 进来啦" + payload.company);
        state.userProfile.COMPANY = payload.company;
    },
    [TYPES.updateDepartment](state, payload) {
        console.log("updateDepartment + mutation 进来啦" + payload.department);
        state.userProfile.DEPARTMENT = payload.department;
    },
    [TYPES.updateMajor](state, payload) {
        console.log("updateMajor + mutation 进来啦" + payload.major);
        state.userProfile.MAJOR = payload.major;
    },
    [TYPES.updateTitle](state, payload) {
        console.log("updateTitle + mutation 进来啦" + payload.title);
        state.userProfile.TITLE = payload.title;
    },
    [TYPES.updateCid](state, payload) {
        console.log("updateCid + mutation 进来啦" + payload.cid);
        state.userProfile.COMPANY_ID = payload.cid;
    },
    [TYPES.updateEmail](state, payload) {
        console.log("updateEmail + mutation 进来啦" + payload.email);
        state.userProfile.EMAIL = payload.email;
    },
    [TYPES.updateMobile](state, payload) {
        console.log("updateMobile + mutation 进来啦" + payload.mobile);
        state.userProfile.MOBILE = payload.mobile;
    },
    [TYPES.updateIndividual](state, payload) {
        console.log("updateIndividual + mutation 进来啦" + payload);
        state.userProfile = payload;
    },
    [TYPES.getUserProfile](state, payload) {
        console.log("getUserProfile + mutation 进来啦" + payload);
        state.userProfile = payload;
    },

    [TYPES.getCourseStsInfo](state, payload) {
        console.log("getCourseStsInfo + mutation 进来啦" + payload);
        state.courseStsInfo = payload;
    },
    [TYPES.getCourseBrifInfo](state, payload) {
        console.log("getCourseBrifInfo + mutation 进来啦" + payload);
        state.courseBrifInfo = payload;
    },
    // [TYPES.updateLearningActivity](state, payload) {
    //     console.log("updateLearningActivity + mutation 进来啦" + payload);
    //     let action = {
    //         type: "",
    //         learningStartTime: 0,
    //         lessonCoordinates: {},
    //         videoCurrentTime: 0,
    //         learningFlag: ""
    //     }
    //     let activity = {
    //         startTime: 0,
    //         courseId: "",
    //         authorId: ""
    //     }
    //     switch (payload.key) {
    //         case "stepIn":
    //             activity.startTime = payload.startTime;
    //             activity.courseId = payload.courseId;
    //             activity.authorId = payload.authorId;
    //             state.currentActivity = activity;
    //             break;
    //         case "action":
    //             action.learningStartTime = payload.startTime;
    //             action.lessonCoordinates = payload.lessonCoordinates;
    //             action.videoCurrentTime = payload.videoCurrentTime;
    //             action.actionType = payload.type;
    //             action.learningFlag = "start"
    //             if (action.actionType == "videoStart") {
    //                 console.log(" videoStart")
    //             } else if (action.actionType == "videoPause") {
    //                 console.log(" videoPause")
    //             } else if (action.actionType == "videoEnded") {
    //                 console.log(" videoEnded")
    //             } else if (action.actionType == "videoTimeChange") {
    //                 console.log(" videoTimeChange")
    //             }
    //             state.currentAction = action;
    //             console.log(state.currentActivity)
    //             if (state.currentActivity.actions == undefined) {
    //                 let alist = [];
    //                 alist = state.currentAction;
    //                 state.currentActivity = { ...state.currentActivity, actions: alist }
    //                 console.log(alist)
    //                 console.log(state.currentActivity)
    //                 // state.currentActivity.actions.push(action);
    //             } else {
    //                 console.log("进来没人")
    //                 let blist = [...state.currentActivity.actions, ...state.currentAction];

    //                 state.currentActivity = { ...state.currentActivity, actions: blist }
    //                 console.log(blist)
    //                 console.log(state.currentActivity)
    //                 // state.currentActivity.actions.push(action);
    //             }

    //             break;
    //         case "stepOut":
    //             activity.endTime = payload.endTime;
    //             // state.currentActivity = activity;
    //             // state.learningActivity.activities.push(activity)
    //             break;


    //         default:
    //             break;
    //     }

    // },
    [TYPES.addAction](state, payload) {
        console.log("addAction + mutation 进来啦" + payload);
        state.currentActivity.ACTION_LIST.push(payload);
    },
    [TYPES.clearCurrentActivity](state) {
        console.log("clearCurrentActivity + mutation 进来啦");
        let payload = {
            courseId: "1",
            authorId: "1",
            startTime: -1,
            ACTION_LIST: []
        }
        state.currentActivity = payload;
    },
    [TYPES.updateActivityInfo](state, payload) {
        console.log("updateActivityInfo + mutation 进来啦" + payload);
        if (payload.key == "stepIn") {
            state.currentActivity.courseId = payload.courseId;
            state.currentActivity.startTime = payload.startTime;
            state.currentActivity.authorId = payload.authorId;
        } else if (payload.key == "stepOut") {
            state.currentActivity.endTime = payload.endTime;
        }
    },
    [TYPES.updateCourseLearningStatus](state, payload) {
        console.log("updateCourseLearningStatus + mutation 进来啦");
        let tempData = {
            startTime: payload.startTime,
            endTime: payload.endTime,
            currentTime: payload.currentTime,
            progress: payload.progress,
            coordinates: payload.coordinates,
            duration: payload.duration
        }
        console.log("---11111")
        // console.log(state.courseLearningStatus[payload.index])
        // console.log(tempData)

        if (payload.key == "play") {
            let startData = {
                startTime: tempData.startTime,
                currentTime: tempData.currentTime,
                progress: tempData.progress,
                coordinates: tempData.coordinates,
                duration: tempData.duration
            }
            if (!state.courseLearningStatus) {
                console.log("初始化第一课的学习状态")
                state.courseLearningStatus.push(startData);
                console.log(state.courseLearningStatus[payload.index])
                console.log("-----start   ")
            } else {
                console.log("---666")
                let flag=false;
                state.courseLearningStatus.forEach(element => {
                    //
                    if((element.coordinates.index-1)==payload.index){
                        flag=true;
                    }
                });
                if(flag==false){
                    console.log("---777")
                    state.courseLearningStatus.push(startData);
                }else{
                    console.log("又一次开始")
                }
            }
        } else if (payload.key == "end") {
            state.courseLearningStatus.forEach((element, index, array) => {
                if((element.coordinates.index-1)==payload.index && tempData.endTime){
                    const newEnd = {
                        ...element,
                        endTime: tempData.endTime,
                        progress: tempData.progress
                    }
                    array[index] = newEnd;
                    console.log(array[index]);
                }
            });
        } else if (payload.key == "time") {
            state.courseLearningStatus.forEach((element, index, array) => {
                // console.log(payload.index);
                // console.log(element.coordinates.index-1);
                if((element.coordinates.index-1)==payload.index && tempData.currentTime){
                    const newPro = {
                        ...element,
                        currentTime: tempData.currentTime,
                        progress: tempData.progress
                    }
                    console.log("-----current   "+index);
                    array[index] = newPro;
                    console.log(array[index]);
                }
            });
        }

    },
    //支付课程
    [TYPES.updatePayCourse](state, payload) {
        console.log("updatePayCourse + mutation 进来啦" + payload);
        state.payCourse = payload;
    },


}
export default mutations;