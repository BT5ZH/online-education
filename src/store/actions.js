import * as TYPES from "./mutation-types"
import axios from "./axios-auth";

const actions = {
  //发送验证码
  sendCode({ commit }, payload) {

    console.log("sendCode action + 进来啦");
    commit(TYPES.dataLoading, true);
    return new Promise((resolve, reject) => {
      axios.post("rs-user/register/code",
        payload)
        .then(res => {
          commit(TYPES.dataLoading, false);
          console.log(res.data.statusCode);
          resolve("rs-102");
        }, err => {
          commit(TYPES.dataLoading, false);
          console.log(err);
          reject("rs-444");
        });
    });
  },
  //注册
  register({ commit }, payload) {
    console.log("register action + 进来啦");
    commit(TYPES.dataLoading, true);
    return new Promise((resolve, reject) => {
      axios.post("rs-user/register",
        payload)
        .then(res => {
          console.log("register  + 注册成功" + res);
          console.log(res);
          commit(TYPES.dataLoading, false);
          Object.prototype.hasOwnProperty.call(res.data, "errorMessage")
          if (Object.prototype.hasOwnProperty.call(res.data, "errorMessage") || Object.prototype.hasOwnProperty.call(res.data, "errorType")) {
            // console.log("注册失败")
            resolve("验证失败")
          } else if (res.data.statusNumber == "rs-102") {
            resolve("rs-102")
          } else if (res.data.statusNumber == "rs-403") {
            resolve("rs-403")
          }


        }, error => {
          commit(TYPES.dataLoading, false);
          reject(error)
        });
    });


  },
  //登录
  login({ commit, state }, authData) {
    let checkToken = "";
    console.log("login action 进来啦")
    return axios.post("/rs-user/login", {
      username: authData.username,
      password: authData.password
    }).then(
      response => {
        console.log(response);
        checkToken = response.data.data.token;
        if (checkToken == undefined || checkToken == "") {
          commit(TYPES.authUser, {
            token: null,
            userId: null
          });
          localStorage.setItem("token", null);
          localStorage.setItem("userId", null);
          localStorage.setItem("roleId", null);
          localStorage.setItem("expirationDate", null);
        } else {
          commit(TYPES.authUser, {
            token: response.data.data.token,
            userId: response.data.data.userId,
            roleId: response.data.data.roleId,
            expirationDate: response.data.data.exp
          });
          localStorage.setItem("token", state.token);
          localStorage.setItem("userId", state.userId);
          localStorage.setItem("roleId", state.roleId);
          localStorage.setItem("expirationDate", state.expirationDate);
        }
      }, error => {
        console.log(error);
      });
  },
  getResources({ commit }) {

    return axios.get('/rs-activity/RESOURCEGET', {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response);
      const payload = response.data.data
      commit(TYPES.getResources, payload);
    }, error => {
      console.log(error);
    });
    // commit(TYPES.getResources, payload);
  },
  releaseCourse({ commit }, payload) {
    commit(TYPES.dataLoading, true);
    commit(TYPES.addLessonIndex, payload);
    return axios.post('/rs-activity/CREATECOURSEPOST', payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response);
      let payload = {
        rscode: response.data.statusNumber
      }
      if (response.data.statusNumber == 'rs-122') {
        console.log("releaseCourse + ------ success")
        commit(TYPES.releaseCourse, payload);
      } else {
        console.log("releaseCourse + ------ failed")
      }
      commit(TYPES.dataLoading, false);

    }, error => {
      console.log(error);
      commit(TYPES.dataLoading, false);
    });
  },
  getUserCourses({ commit }) {
    commit(TYPES.dataLoading, true);
    return axios.get('/rs-activity/USERCOURSESGET', {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response);
      const payload = response.data.data
      commit(TYPES.getUserCourses, payload);
      commit(TYPES.dataLoading, false);
    }, error => {
      console.log(error);
      commit(TYPES.dataLoading, false);
    });
  },

  //用户选择的课程f
  getMyCourses({ commit }) {
    commit(TYPES.dataLoading, true);
    return axios.get('/rs-user/course/COURSEGET', {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response);
      const payload = response.data.data
      commit(TYPES.getMyCourses, payload);
      commit(TYPES.dataLoading, false);
    }, error => {
      console.log(error);
      commit(TYPES.dataLoading, false);
    });
  },
  getAllCourses({ commit }) {
    commit(TYPES.dataLoading, true);
    return axios.get('/rs-activity/ALLCOURSESGET', {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      commit(TYPES.dataLoading, false);
      const payload = response.data.data
      commit(TYPES.getAllCourses, payload);
      
    }).catch(error=>{
      commit(TYPES.dataLoading, false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        console.log(error.request.data);
        console.log(error.request.status);
        console.log(error.request.headers);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
   
    });
    // , error => {
    //   commit(TYPES.dataLoading, false);
    //   console.log(error.response);
    //   switch (error.response.status) {
    //     case 401:
    //       this.$router.push({ name: 'blank' })
    //       break;
      
    //     default:
    //       break;
    //   }
      
    // }
  },

  selectToLearn({ commit }, payload) {

    return axios.post('/rs-user/course/SELECTCOURSEPOST', payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response);
      const payload = response.data.data
      commit(TYPES.selectToLearn, payload);
    }, error => {
      console.log(error);
    });
  },


  //学习活动
  initLearningStatus({ commit }, payload) {
    console.log("initLearningStatus action + 进来啦");
    commit(TYPES.initLearningStatus, payload)
  },
  learningTheCourse({ commit }, payload) {
    commit(TYPES.dataLoading, true);
    let queryUrl = "/rs-activity/LEARNINGCOURSEGET/" + payload.courseId + "?authorId=" + payload.authorId;
    return new Promise((resolve, reject) => {

      axios.get(queryUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      }).then(response => {
        console.log(response);
        commit(TYPES.dataLoading, false);
        const payload = response.data.data
        commit(TYPES.learningTheCourse, payload);
        commit(TYPES.showCurrentLesson, { index: 0, number: 0 });
        if (response.data.statusNumber == "rs-120") {
          resolve("rs-120");
        } else {
          resolve("rs-444");
        }

      }, error => {
        console.log(error);
        commit(TYPES.dataLoading, false);
        reject("rs-444");
      });
    });
  },
  showCurrentLesson({ commit }, payload) {
    commit(TYPES.showCurrentLesson, payload);
  },

  submitLearningActivityInfo({ commit },payload) {
    let data = {
      key: "stepOut",
      endTime: new Date().getTime(),

    };
    commit("updateActivityInfo", data);

    console.log("这一次学习活动结束啦");
    // let payload = state.currentActivity;
    commit(TYPES.dataLoading, true);
    // let queryUrl = "/rs-user/course/detail/"+payload.courseId+"/UPDATELEARNINGDETAIL";
    let queryUrl = "/rs-user/learning/UPDATELEARNINGDETAIL"+"/?courseId="+payload.courseId;
    return new Promise((resolve, reject) => {
      axios.post(queryUrl, payload.data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      }).then(response => {
        console.log(response);
        commit(TYPES.clearCurrentActivity);
        commit(TYPES.dataLoading, false);
        resolve("rs-120");
      }, error => {
        console.log(error);
        commit(TYPES.dataLoading, false);
        reject("rs-444");
      });
    });
  },

  backToCookTop({ commit }, payload) {
    commit(TYPES.backToCookTop, payload)
  },

  editTheCourse({ commit }, payload) {
    commit(TYPES.dataLoading, true);
    let queryUrl = "/rs-activity/COOKCOURSEGET/" + payload.courseId;
    return axios.get(queryUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {

      const payload = response.data.data
      commit(TYPES.editTheCourse, payload);
      commit(TYPES.dataLoading, false);
    }, error => {
      console.log(error);
      commit(TYPES.dataLoading, false);
    });
  },

  updateCourseName({ commit }, payload) {
    commit(TYPES.updateCourseName, payload);
  },
  updateCourseStatus({ commit }, payload) {
    commit(TYPES.updateCourseStatus, payload);
  },
  updateCourseSummary({ commit }, payload) {
    commit(TYPES.updateCourseSummary, payload);
  },
  updateCourseAnnouncement({ commit }, payload) {
    commit(TYPES.updateCourseAnnouncement, payload);
  },
  addChapter({ commit }, chapter) {
    commit(TYPES.addChapter, chapter);
  },
  addLesson({ commit }, payload) {
    commit(TYPES.addLesson, payload);
  },
  updateChapterName({ commit }, payload) {
    commit(TYPES.updateChapterName, payload);
  },
  updateChapterEditFlag({ commit }, payload) {
    commit(TYPES.updateChapterEditFlag, payload);
  },
  updateLessonName({ commit }, payload) {
    commit(TYPES.updateLessonName, payload);
    //  updateLessonName
  },
  updateLessonEditFlag({ commit }, payload) {
    commit(TYPES.updateLessonEditFlag, payload);
  },
  prepareMatching({ commit }, payload) {
    commit(TYPES.prepareMatching, payload);
  },
  lockResource({ commit }, payload) {
    commit(TYPES.lockResource, payload);
  },
  lockCover({ commit }, payload) {
    commit(TYPES.lockCover, payload);
  },
  authUser({ commit }, payload) {
    commit(TYPES.authUser, payload);
  },
  signout({ commit }) {
    
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
    localStorage.setItem("roleId", null);
    localStorage.setItem("expirationDate", null);
    commit(TYPES.unAuthUser);
  },

  //updateInfo
  updateRealName({ commit }, payload) {
    commit(TYPES.updateCourseName, payload);
  },
  updateCompany({ commit }, payload) {
    console.log("updateCompany action");
    commit(TYPES.updateCompany, payload);
  },
  updateDepartment({ commit }, payload) {
    commit(TYPES.updateDepartment, payload);
  },
  updateMajor({ commit }, payload) {
    commit(TYPES.updateMajor, payload);
  },
  updateTitle({ commit }, payload) {
    commit(TYPES.updateTitle, payload);
  },
  updateCid({ commit }, payload) {
    commit(TYPES.updateCid, payload);
  },
  updateEmail({ commit }, payload) {
    commit(TYPES.updateEmail, payload);
  },
  updateMobile({ commit }, payload) {
    commit(TYPES.updateMobile, payload);
  },
  updatebirthday({ commit }, payload) {
    commit(TYPES.updatebirthday, payload);
  },
  updateIndividual({ commit }, payload) {

    console.log("updateIndividual action + 进来啦");
    commit(TYPES.dataLoading, true);
    console.log(payload);
    return new Promise((resolve, reject) => {
      axios.put("rs-user/profile/UPDATEPERSONALMESSAGE",
        payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
        .then(() => {
          commit(TYPES.dataLoading, false);
          commit(TYPES.updateIndividual, payload)
          resolve("rs-102");
        }, err => {
          commit(TYPES.dataLoading, false);
          console.log(err);
          reject("rs-444");
        });
    });
  },
  updatePassword({ commit }, payload) {
    console.log("updateIndividual action + 进来啦");
    commit(TYPES.dataLoading, true);
    console.log(payload);
    return new Promise((resolve, reject) => {
      axios.put("rs-user/profile/PASSWORDUPDATE",
        payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => {
          commit(TYPES.dataLoading, false);
          console.log(res);
          resolve("rs-102");
        }, err => {
          commit(TYPES.dataLoading, false);
          console.log(err);
          reject("rs-444");
        });
    });
  },
  getUserProfile({ commit }) {
    console.log("updateIndividual action + 进来啦");
    commit(TYPES.dataLoading, true);
    return new Promise((resolve, reject) => {
      axios.get("/rs-user/profile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          commit(TYPES.dataLoading, false);
          const payload = res.data.data
          commit(TYPES.getUserProfile, payload)
          resolve("rs-102");
        }).catch(error=>{
          commit(TYPES.dataLoading, false);
          console.log(error)
          if(error.response){
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
          reject("rs-444");
        });
        // , err => {
        //   commit(TYPES.dataLoading, false);
        //   console.log(err);
        //   console.log(err.response.status);
        //   reject("rs-444");
        // }
    });

  },
  updateCourseLearningStatus({ commit }, payload) {
    console.log("updateCourseLearningStatus action + 进来啦");
    const data = payload.lessonStatus
    commit(TYPES.updateCourseLearningStatus, data);
    if(Object.prototype.hasOwnProperty.call(payload,"actionContent")){
      commit(TYPES.addAction, payload.actionContent);
    }
    
  },
  addAction({ commit }, actionContent) {
    commit(TYPES.addAction, actionContent);
  },
  updateActivityInfo({ commit }, payload){
    commit(TYPES.updateActivityInfo, payload);
  },
  
  getCourseStsInfo({commit},payload){
    console.log("getCourseStsInfo action + 进来啦");
    commit(TYPES.dataLoading, true);
    let queryStr= "/?courseId="+payload.courseId+"&authorId="+payload.authorId
      +"&workPlace="+payload.workPlace+"&department="+payload.department
      +"&major="+payload.major+"&timeFlag="+payload.timeFlag
    return new Promise((resolve, reject) => {
      axios.get("rs-user/learning/GETLEARNINGDETAIL"+queryStr,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => {
          
          commit(TYPES.dataLoading, false);
          console.log(res);
          const payload = res.data.data
          commit(TYPES.getCourseStsInfo, payload.userDetail)
          commit(TYPES.getCourseBrifInfo, payload.courseDetail)
          resolve("rs-102");
        }, err => {
          commit(TYPES.dataLoading, false);
          console.log(err);
          reject("rs-444");
        });
    });
  },
  resetLearningProgress({commit},payload){
    let query = "/?courseId="+payload.courseId;
    return new Promise((resolve, reject) => {
      axios.delete("rs-user/learning/DELETEDETAIL"+query,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => {
          commit(TYPES.dataLoading, false);
          console.log(res);
          resolve("rs-102");
        }, err => {
          commit(TYPES.dataLoading, false);
          console.log(err);
          reject("rs-444");
        });
    });
  }
};
export default actions;