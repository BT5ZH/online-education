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
        // this.$toast.success({title:"您辛苦啦",message:"该课程已经创建成功"});
        console.log("releaseCourse + ------ success")
        commit(TYPES.releaseCourse, payload);
      } else {
        // this.$toast.error({title:"抱歉",message:"您的课程创建失败"});
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
      const payload = response.data.data
      commit(TYPES.getAllCourses, payload);
      commit(TYPES.dataLoading, false);
    }, error => {
      console.log(error);
      commit(TYPES.dataLoading, false);
    });
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
        const payload = response.data.data
        commit(TYPES.learningTheCourse, payload);
        commit(TYPES.showCurrentLesson, { index: 0, number: 0 });
        commit(TYPES.dataLoading, false);
        resolve("rs-102");
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
      axios.get("rs-user/profile",
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
        }, err => {
          commit(TYPES.dataLoading, false);
          console.log(err);
          reject("rs-444");
        });
    });

  },
  // getCourseStsInfo({commit}){
  //   console.log("getCourseStsInfo action + 进来啦");
  //   commit(TYPES.dataLoading, true);
  //   return new Promise((resolve, reject) => {
  //     axios.get("rs-user/profile",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: localStorage.getItem("token")
  //       }
  //     })
  //       .then(res => {
  //         commit(TYPES.dataLoading, false);
  //         const payload = res.data.data
  //         commit(TYPES.getUserProfile, payload)
  //         resolve("rs-102");
  //       }, err => {
  //         commit(TYPES.dataLoading, false);
  //         console.log(err);
  //         reject("rs-444");
  //       });
  //   });
  // },

};
export default actions;