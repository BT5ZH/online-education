import * as TYPES from "./mutation-types"
import axios from "./axios-auth";

const actions = {
  //登录注册
  login({ commit, state }, authData) {
    let checkToken = "";
    console.log("进来啦")
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
    commit(TYPES.dataLoading,true);
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
      commit(TYPES.dataLoading,false);

    }, error => {
      console.log(error);
      commit(TYPES.dataLoading,false);
    });
  },
  getUserCourses({ commit }) {
    commit(TYPES.dataLoading,true);
    return axios.get('/rs-activity/USERCOURSESGET', {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response);
      const payload = response.data.data
      commit(TYPES.getUserCourses, payload);
      commit(TYPES.dataLoading,false);
    }, error => {
      console.log(error);
      commit(TYPES.dataLoading,false);
    });
  },

  //用户选择的课程f
  getMyCourses({ commit }) {
    commit(TYPES.dataLoading,true);
    return axios.get('/rs-user/course/COURSEGET', {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response);
      const payload = response.data.data
      commit(TYPES.getMyCourses, payload);
      commit(TYPES.dataLoading,false);
    }, error => {
      console.log(error);
      commit(TYPES.dataLoading,false);
    });
  },
  getAllCourses({ commit }) {
    commit(TYPES.dataLoading,true);
    return axios.get('/rs-activity/ALLCOURSESGET', {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      const payload = response.data.data
      commit(TYPES.getAllCourses, payload);
      commit(TYPES.dataLoading,false);
    }, error => {
      console.log(error);
      commit(TYPES.dataLoading,false);
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
    commit(TYPES.dataLoading,true);
    let queryUrl = "/rs-activity/LEARNINGCOURSEGET/" + payload.courseId + "?authorId=" + payload.authorId;
    return axios.get(queryUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response);
      const payload = response.data.data
      commit(TYPES.learningTheCourse, payload);
      commit(TYPES.showCurrentLesson, { index: 0, number: 0 });
      commit(TYPES.dataLoading,false);
    }, error => {
      console.log(error);
      commit(TYPES.dataLoading,false);
    });
  },
  showCurrentLesson({ commit }, payload) {
    commit(TYPES.showCurrentLesson, payload);
  },

  backToCookTop({ commit }, payload) {
    commit(TYPES.backToCookTop, payload)
  },

  editTheCourse({ commit }, payload) {
    commit(TYPES.dataLoading,true);
    let queryUrl = "/rs-activity/COOKCOURSEGET/" + payload.courseId;
    return axios.get(queryUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {

      const payload = response.data.data
      commit(TYPES.editTheCourse, payload);
      commit(TYPES.dataLoading,false);
    }, error => {
      console.log(error);
      commit(TYPES.dataLoading,false);
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
    localStorage.setItem("token", null) ;
    localStorage.setItem("userId", null) ;
    localStorage.setItem("roleId", null) ;
    localStorage.setItem("expirationDate", null) ;
    commit(TYPES.unAuthUser);
  }

};
export default actions;