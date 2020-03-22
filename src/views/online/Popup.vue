<template>
    <div class="profilePop" id="popup">
        <div class="profilePop__content">
            <div class="profile">
                <div class="profile__l">
                    <div class="profile__l__card">
                        <div class="user__card profile__l__card__side profile__l__card__side--front">
                            <div class="user__card__header">
                                <div class="user__card__header--left">
                                    <svg class="user-nav__icon">
                                        <use xlink:href="../../assets/img/all.svg#icon-new-message"></use>
                                    </svg>
                                </div>
                                <div class="user__card__header--right">
                                    <svg class="user-nav__icon">
                                        <use xlink:href="../../assets/img/all.svg#icon-chat"></use>
                                    </svg><svg class="user-nav__icon">
                                        <use xlink:href="../../assets/img/all.svg#icon-heart"></use>
                                    </svg><svg class="user-nav__icon">
                                        <use xlink:href="../../assets/img/all.svg#icon-plus"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__img">
                                <img src="https://rs-learning-resources.s3.cn-northwest-1.amazonaws.com.cn/teaching/resources/2704133E/AVATAR01.jpg"
                                    alt="">
                            </div>
                            <div class="user__card__cover">
                                <div class="user__card__cover--blank">张汇泉</div>
                                <div class="user__card__cover--name">张汇泉</div>
                                <div class="user__card__cover--age">39</div>
                                <div class="user__card__cover--occ">讲师</div>
                                <div class="user__card__cover--company">陕西师范大学</div>
                                <div class="user__card__cover--department">计算机科学学院</div>
                                <div class="user__card__cover--des">Very proud to be participating in the campaign with
                                </div>
                            </div>

                            <div class="user__card__footer">
                                <div class="user__card__footer--email">
                                    陕西师范大学
                                </div>
                                <div class="user__card__footer--right">
                                    计算机科学学院
                                </div>
                            </div>
                        </div>
                        <div class="user__card__back profile__l__card__side profile__l__card__side--back">
                            <div class="user__card__back__inner user__card__back--name">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!realNameEdit" for="">
                                        <span v-if="!userInfo.REAL_NAME">姓名</span>
                                        <span v-if="userInfo.REAL_NAME">{{userInfo.REAL_NAME}}</span>
                                    </label>
                                    <input v-if="realNameEdit" type="text" class="user__card__back__input"
                                        name="realName" placeholder="姓名">
                                </div>
                                <div class="user__card__back__inner--op" @click="editRealName">
                                    <svg class="">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--company">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!companyEdit" for="">
                                        <span v-if="!userInfo.COMPANY">公司/学校</span>
                                        <span v-if="userInfo.COMPANY">{{userInfo.COMPANY}}</span>
                                    </label>
                                    <input v-if="companyEdit" type="text" class="user__card__back__input" name="company"
                                        placeholder="公司/学校">
                                </div>
                                <div class="user__card__back__inner--op" @click="editCompany">
                                    <svg class="">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--department">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!departmentEdit" for="">
                                        <span v-if="!userInfo.DEPARTMENT">部门/学院</span>
                                        <span v-if="userInfo.DEPARTMENT">{{userInfo.DEPARTMENT}}</span>
                                    </label>
                                    <input v-if="departmentEdit" type="text" class="user__card__back__input"
                                        name="department" placeholder="部门/学院">
                                </div>
                                <div class="user__card__back__inner--op" @click="editDepartment">

                                    <svg class="">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--major">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!majorEdit" for="">
                                        <span v-if="!userInfo.MAJOR">子部门/专业</span>
                                        <span v-if="userInfo.MAJOR">{{userInfo.TITLE}}</span>
                                    </label>
                                    <input v-if="majorEdit" type="text" class="user__card__back__input" name="title"
                                        placeholder="头衔">
                                </div>
                                <div class="user__card__back__inner--op" @click="editMajor">

                                    <svg class="">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--title">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!titleEdit" for="">
                                        <span v-if="!userInfo.TITLE">头衔/职位</span>
                                        <span v-if="userInfo.TITLE">{{userInfo.TITLE}}</span>
                                    </label>
                                    <input v-if="titleEdit" type="text" class="user__card__back__input" name="title"
                                        placeholder="头衔">
                                </div>
                                <div class="user__card__back__inner--op" @click="editTitle">

                                    <svg class="">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--cid">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!cidEdit" for="">
                                        <span v-if="!userInfo.COMPANY_ID">企业ID/学号</span>
                                        <span v-if="userInfo.COMPANY_ID">{{userInfo.COMPANY_ID}}</span>
                                    </label>
                                    <input v-if="cidEdit" type="text" class="user__card__back__input" name="cid"
                                        placeholder="企业ID">
                                </div>
                                <div class="user__card__back__inner--op" @click="editCid">
                                    <svg class="">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--email">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!emailEdit" for="">
                                        <span v-if="!userInfo.EMAIL">邮件</span>
                                        <span v-if="userInfo.EMAIL">{{userInfo.EMAIL}}</span>
                                    </label>
                                    <input v-if="emailEdit" type="text" class="user__card__back__input" name="email"
                                        placeholder="邮件">
                                </div>
                                <div class="user__card__back__inner--op" @click="editEmail">

                                    <svg class="">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--mobile">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!mobileEdit" for="">
                                        <span v-if="!userInfo.MOBILE">手机</span>
                                        <span v-if="userInfo.MOBILE">{{userInfo.MOBILE}}</span>
                                    </label>
                                    <input v-if="mobileEdit" type="text" class="user__card__back__input" name="mobile"
                                        placeholder="手机">
                                </div>
                                <div class="user__card__back__inner--op" @click="editMobile">
                                    <svg class="">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--birthday">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!birthdayEdit" for="">
                                        <span v-if="!userInfo.BIRTHDAY">生年月日</span>
                                        <span v-if="userInfo.BIRTHDAY">{{userInfo.BIRTHDAY}}</span>
                                    </label>
                                    <input v-if="birthdayEdit" type="text" class="user__card__back__input" name="birthday"
                                        placeholder="生年月日">
                                </div>
                                <div class="user__card__back__inner--op" @click="editBirthday">
                                    <svg class="">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <div class="profile__r">
                    <div class="profile__r__card">
                        <div class="pass__card__front profile__r__card__side profile__r__card__side--front">
                            <div class="pass__card__front__header">
                                修改密码
                            </div>
                            <div class="pass__card__front__btn">
                                <svg>
                                    <use xlink:href="../../assets/img/all.svg#icon-paper-plane"></use>
                                </svg>
                            </div>
                            <div class="pass__card__front__oldPass">
                                <label for="oldPass">旧密码：</label>
                                <input type="text" placeholder="请输入旧密码" name="oldPass" id="oldPass">
                            </div>
                            <div class="pass__card__front__newPass">
                                <label for="newPass">新密码：</label>
                                <input type="text" placeholder="请输入新密码" name="newPass" id="newPass">
                            </div>
                            <div class="pass__card__front__newPassC">
                                <label for="newPassC">防手抖：</label>
                                <input type="text" placeholder="请再输入一遍新密码" name="newPassC" id="newPassC">
                            </div>
                        </div>
                        <div class="pass__card__back profile__r__card__side profile__r__card__side--back">
                            back
                        </div>
                    </div>
                    <div class="profile__r__connect">
                        <div class="connect__card__front profile__r__connect__side profile__r__connect__side--front">
                            <div class="connect__card__front__header">
                                修改手机号
                            </div>
                            <div class="connect__card__front__btn">
                                <svg>
                                    <use xlink:href="../../assets/img/all.svg#icon-paper-plane"></use>
                                </svg>
                            </div>
                            <div class="connect__card__front__newNumber">
                                <label for="newNumber">新号码：</label>
                                <input type="text" placeholder="请输入新手机号码" name="newNumber" id="newNumber">
                            </div>
                            <div class="connect__card__front__smsCode">
                                <label for="smsCode">验证码：</label>
                                <input type="text" placeholder="请输入验证码" name="smsCode" id="smsCode">
                            </div>
                            <div class="connect__card__front__getBtn">

                                <button @click="getSMSCode" :disabled="timerShow">获取验证码<span v-if="timerShow">{{timerCount}}</span></button>
                            </div>
                        </div>
                    </div>
                    <div class="profile__r__avatar">
                        <div class="avatar__card__front profile__r__avatar__side profile__r__avatar__side--front">
                            <div class="avatar__card__front__header">
                                上传头像
                            </div>
                            
                        </div>
                    </div>
                    <div class="profile__r__profile">
                        <div class="profile__card__front profile__r__profile__side profile__r__profile__side--front">
                            <div class="profile__card__front__header">
                                修改个人情报
                            </div>
                            <div v-if="!individualInfoEdit" class="profile__card__front__edit" @click="editIndividualInfo">
                                <svg>
                                    <use xlink:href="../../assets/img/all.svg#icon-new-message"></use>
                                </svg>
                            </div>
                            <div v-if="individualInfoEdit" class="profile__card__front__btn" @click="submitIndividualInfo">
                                <svg>
                                    <use xlink:href="../../assets/img/all.svg#icon-paper-plane"></use>
                                </svg>
                            </div>
                            <div class="profile__card__front__realName">
                                <label for="realName">姓名：</label>
                                <div class="profile__card__front--specific">
                                    <input v-if="individualInfoEdit" type="text" placeholder="您的姓名" name="realName" id="realName">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span>韦小宝</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="profile__card__front__company">
                                <label for="company">企业：</label>
                                <div class="profile__card__front--specific">
                                    <input v-if="individualInfoEdit" type="text" placeholder="公司/学校" name="company" id="company">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span>陕西师范大学</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="profile__card__front__department">
                                <label for="department">部门：</label>
                                <div class="profile__card__front--specific">
                                    <input v-if="individualInfoEdit" type="text" placeholder="部门/学院" name="department" id="department">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span>计算机科学学院</span>
                                    </div>
                                </div>
                            </div>
                            <div class="profile__card__front__major">
                                <label for="major">专业：</label>
                                <div class="profile__card__front--specific">
                                    <input v-if="individualInfoEdit" type="text" placeholder="组/专业" name="major" id="major">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span>软件工程</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="profile__card__front__cid">
                                <label for="cid">身份：</label>
                                <div class="profile__card__front--specific">
                                    <input v-if="individualInfoEdit" type="text" placeholder="企业ID/学号" name="cid" id="cid">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span>41628888</span>
                                    </div>
                                </div>
                            </div>
                            <div class="profile__card__front__title">
                                <label for="title">头衔：</label>
                                <div class="profile__card__front--specific">
                                    <!-- <input v-if="!individualInfoEdit" type="text" placeholder="企业ID/学号" name="cid" id="cid"> -->
                                    <div v-if="individualInfoEdit" class="profile__card__front__title--sel" @click="showTitle()">
                                        <div class="profile__card__front__title--sel__show" >
                                            <input v-model="titleValue" type="text" placeholder="头衔" name="title" id="title">
                                            <svg>
                                                <use xlink:href="../../assets/img/all.svg#icon-chevron-down"></use>
                                            </svg>
                                        </div>
                                        <div class="profile__card__front__title--list" v-show="titleShow">
                                            <ul>
                                                <li @click="getTitleValue(index,item)" v-for="(item,index) in titleList" :key="index">{{item.title}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span>学生</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="profile__card__front__gender">
                                <label for="gender">性别：</label>
                                <div class="profile__card__front--specific">
                                    <div v-if="individualInfoEdit" class="profile__card__front__gender--sel" @click="showGender()">
                                        <div class="profile__card__front__gender--sel__show" >
                                            <input v-model="genderValue" type="text" placeholder="性别" name="gender" id="gender">
                                            <svg>
                                                <use xlink:href="../../assets/img/all.svg#icon-chevron-down"></use>
                                            </svg>
                                        </div>
                                        <div class="profile__card__front__gender--list" v-show="genderShow">
                                            <ul>
                                                <li @click="getGenderValue(index,item)" v-for="(item,index) in gender" :key="index">{{item.gender}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span>男</span>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <a href="#section-tours" class="profilePop__close">&times;</a>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                realNameEdit: false,
                realName: "",
                companyEdit: false,
                company: "",
                departmentEdit: false,
                department: "",
                majorEdit:false,
                major:"",
                titleEdit: false,
                title: "",
                cidEdit: false,
                cid: "",
                emailEdit: false,
                email: "",
                mobileEdit: false,
                mobile: "",
                birthdayEdit: false,
                birthday: "",
                genderShow:false,
                genderValue:"",
                gender:[
                    {"gender":"男"},
                    {"gender":"女"},
                    {"gender":"无法分辨"},
                ],
                titleShow:false,
                titleValue:"",
                titleList:[
                    {"title":"学生"},
                    {"title":"讲师"},
                    {"title":"副教授"},
                    {"title":"教授"},
                ],
                individualInfoEdit:false,
                timerShow:false,
                timerCount:0,
                timer:null

            }
        },
        watch: {

        },
        computed: {
            userInfo() {
                return this.$store.state.userProfile;
            }
        },
        methods: {
            editRealName: function () {
                this.realNameEdit = !this.realNameEdit;
                if (this.realNameEdit) {
                    console.log("this.realNameEdit: " + this.realNameEdit);
                } else {
                    let payload = {
                        realName: this.realName
                    }
                    if (!this.userInfo.REAL_NAME) {
                        this.$store.dispatch("updateRealName", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            },
            editCompany: function () {
                this.companyEdit = !this.companyEdit;
                if (this.companyEdit) {
                    console.log("this.companyEdit: " + this.companyEdit);
                } else {
                    let payload = {
                        company: this.company
                    }
                    if (!this.userInfo.COMPANY) {
                        this.$store.dispatch("updateCompany", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            },
            editDepartment: function () {
                this.departmentEdit = !this.departmentEdit;
                if (this.departmentEdit) {
                    console.log("this.departmentEdit: " + this.departmentEdit);
                } else {
                    let payload = {
                        department: this.department
                    }
                    if (!this.userInfo.DEPARTMENT) {
                        this.$store.dispatch("updateDepartment", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            },
            editMajor: function () {
                this.majorEdit = !this.majorEdit;
                if (this.majorEdit) {
                    console.log("this.majorEdit: " + this.majorEdit);
                } else {
                    let payload = {
                        major: this.major
                    }
                    if (!this.userInfo.MAJOR) {
                        this.$store.dispatch("updateMajor", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            },
            editTitle: function () {
                this.titleEdit = !this.titleEdit;
                if (this.titleEdit) {
                    console.log("this.titleEdit: " + this.titleEdit);
                } else {
                    let payload = {
                        title: this.title
                    }
                    if (!this.userInfo.TITLE) {
                        this.$store.dispatch("updateTitle", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            },
            editCid: function () {
                this.cidEdit = !this.cidEdit;
                if (this.cidEdit) {
                    console.log("this.cidEdit: " + this.cidEdit);
                } else {
                    let payload = {
                        cid: this.cid
                    }
                    if (!this.userInfo.COMPANY_ID) {
                        this.$store.dispatch("updateCid", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            },
            editEmail: function () {
                this.emailEdit = !this.emailEdit;
                if (this.emailEdit) {
                    console.log("this.emailEdit: " + this.emailEdit);
                } else {
                    let payload = {
                        email: this.email
                    }
                    if (!this.userInfo.EMAIL) {
                        this.$store.dispatch("updateEmail", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            },
            editMobile: function () {
                this.mobileEdit = !this.mobileEdit;
                if (this.mobileEdit) {
                    console.log("this.mobileEdit: " + this.mobileEdit);
                } else {
                    let payload = {
                        mobile: this.mobile
                    }
                    if (!this.userInfo.MOBILE) {
                        this.$store.dispatch("updateMobile", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            },
            editBirthday: function () {
                this.birthdayEdit = !this.birthdayEdit;
                if (this.birthdayEdit) {
                    console.log("this.birthdayEdit: " + this.birthdayEdit);
                } else {
                    let payload = {
                        birthdya: this.birthday
                    }
                    if (!this.userInfo.BIRTHDAY) {
                        this.$store.dispatch("updateBirthday", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                }
            },
            showGender:function(){
                this.genderShow=!this.genderShow
            },
            getGenderValue:function(index, item){
                this.genderValue = item.gender;
                this.genderShow = false;
            },
            showTitle:function(){
                this.titleShow=!this.titleShow
            },
            getTitleValue:function(index, item){
                this.titleValue = item.title;
                this.titleShow = false;
            },
            editIndividualInfo:function(){
                this.individualInfoEdit=!this.individualInfoEdit;
            },
            submitIndividualInfo:function(){
                
                    let payload = {
                        realName: this.realName,
                        company: this.company,
                        department: this.department,
                        major: this.major,
                        title: this.titleValue,
                        gender: this.gendervalue
                    }
                    if (!this.userInfo.BIRTHDAY) {
                        this.$store.dispatch("updateIndividual", payload).then(() => {
                            console.log("添加姓名成功返回");
                        }).catch((err) => {
                            console.error(err);
                        })
                    }
                this.individualInfoEdit=!this.individualInfoEdit
            },
            getSMSCode:function(){
                const TIME_COUNT = 300;
                if(!this.timer){
                    this.timerCount = TIME_COUNT;
                    this.timerShow = true;
                    this.timer = setInterval(()=>{
                        if(this.timerCount>0 && this.timerCount <=TIME_COUNT){
                            this.timerCount--;
                        }else {
                            this.timerShow = false;
                            clearInterval(this.timer);
                            this.timer =null;
                        }
                    },1000)
                }
            },

        },
    }
</script>

<!-- <style lang="scss">
    .lg {
        background-image: linear-gradient(100deg,
                rgba($color-white, .9) 0%,
                rgba($color-white, .9) 50%,
                transparent 50%), url("../../assets/img/login-bkg_1920.jpg");
    }
</style> -->