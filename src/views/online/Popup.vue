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
                                    <input v-if="birthdayEdit" type="text" class="user__card__back__input"
                                        name="birthday" placeholder="生年月日">
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
                            <div class="pass__card__front__btn" @click="updatePassword">
                                <svg>
                                    <use xlink:href="../../assets/img/all.svg#icon-paper-plane"></use>
                                </svg>
                            </div>
                            <div class="pass__card__front__oldPass">
                                <label for="oldPass">旧密码：</label>
                                <input v-model="oldPass" type="text" placeholder="请输入旧密码" name="oldPass" id="oldPass">
                            </div>
                            <div class="pass__card__front__newPass">
                                <label for="newPass">新密码：</label>
                                <input v-model="newPass" type="text" placeholder="请输入新密码" name="newPass" id="newPass">
                            </div>
                            <div class="pass__card__front__newPassC">
                                <label for="newPassC">防手抖：</label>
                                <input v-model="newPassC" type="text" placeholder="请再输入一遍新密码" name="newPassC"
                                    id="newPassC">
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

                                <button @click="getSMSCode" :disabled="timerShow">获取验证码<span
                                        v-if="timerShow">{{timerCount}}</span></button>
                            </div>
                        </div>
                    </div>
                    <div class="profile__r__avatar" id="file-drag-drop">
                        <div class="avatar__card__front profile__r__avatar__side profile__r__avatar__side--front">
                            <div class="avatar__card__front__header">
                                拖拽头像到此卡片
                            </div>
                            <div class="avatar__card__front__area" v-for="(item,index) in files" :key="index">
                                <img class=" preview" v-bind:ref="'preview'+parseInt( index )">
                                <svg class="avatar__card__front__area--remove" v-on:click="removeFile( item )">
                                    <use xlink:href="../../assets/img/all.svg#icon-circle-with-cross"></use>
                                </svg>
                                <svg class="avatar__card__front__area--send" v-on:click="uploadBusiness( index )">
                                    <use xlink:href="../../assets/img/all.svg#icon-paper-plane"></use>
                                </svg>
                                <div class="avatar__card__front__area--upload">{{currentLoad }}</div>
                            </div>
                            <!-- <div class="avatar__card__front__area " v-for="(item,index) in files" :key="index">
                                <img class="avatar__card__front__area--img preview"
                                    v-bind:ref="'preview'+parseInt( index )">
                                <svg class="avatar__card__front__area--btn" v-on:click="removeFile( item )">
                                    <use xlink:href="../../assets/img/all.svg#icon-circle-with-cross"></use>
                                </svg>
                            </div> -->
                        </div>
                    </div>
                    <div class="profile__r__profile">
                        <div class="profile__card__front profile__r__profile__side profile__r__profile__side--front">
                            <div class="profile__card__front__header">
                                修改个人情报
                            </div>
                            <div class="profile__card__front__edit" @click="editIndividualInfo">
                                <svg>
                                    <use xlink:href="../../assets/img/all.svg#icon-new-message"></use>
                                </svg>
                            </div>
                            <div v-if="individualInfoEdit" class="profile__card__front__btn"
                                @click="submitIndividualInfo">
                                <svg>
                                    <use xlink:href="../../assets/img/all.svg#icon-paper-plane"></use>
                                </svg>
                            </div>
                            <div class="profile__card__front__realName">
                                <label for="realName">姓名：</label>
                                <div class="profile__card__front--specific">
                                    <input v-if="individualInfoEdit" v-model="userInfo.NAME" type="text"
                                        placeholder="您的姓名" name="realName" id="realName">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span v-if="!userInfo.NAME">韦小宝</span>
                                        <span v-if="userInfo.NAME">{{userInfo.NAME}}</span>
                                    </div>
                                </div>

                            </div>
                            <div class="profile__card__front__company">
                                <label for="company">企业：</label>
                                <div class="profile__card__front--specific">
                                    <input v-if="individualInfoEdit" v-model="userInfo.WORKPLACE" type="text"
                                        placeholder="公司/学校" name="company" id="company">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span v-if="!userInfo.COMPANY">陕西师范大学</span>
                                        <span v-if="userInfo.COMPANY">{{userInfo.WORKPLACE}}</span>
                                    </div>
                                </div>

                            </div>
                            <div class="profile__card__front__department">
                                <label for="department">部门：</label>
                                <div class="profile__card__front--specific">
                                    <input v-if="individualInfoEdit" v-model="userInfo.DEPARTMENT" type="text"
                                        placeholder="部门/学院" name="department" id="department">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span v-if="!userInfo.DEPARTMENT">计算机科学学院</span>
                                        <span v-if="userInfo.DEPARTMENT">{{userInfo.DEPARTMENT}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="profile__card__front__major">
                                <label for="major">专业：</label>
                                <div class="profile__card__front--specific">
                                    <input v-if="individualInfoEdit" v-model="userInfo.MAJOR" type="text"
                                        placeholder="组/专业" name="major" id="major">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span v-if="!userInfo.MAJOR">软件工程</span>
                                        <span v-if="userInfo.MAJOR">{{userInfo.MAJOR}}</span>
                                    </div>
                                </div>

                            </div>
                            <div class="profile__card__front__cid">
                                <label for="cid">身份：</label>
                                <div class="profile__card__front--specific">
                                    <input v-model="userInfo.COMPANY_ID" v-if="individualInfoEdit" type="text"
                                        placeholder="企业ID/学号" name="cid" id="cid">
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span v-if="!userInfo.COMPANY_ID">41778888</span>
                                        <span v-if="userInfo.COMPANY_ID">{{userInfo.COMPANY_ID}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="profile__card__front__title">
                                <label for="title">头衔：</label>
                                <div class="profile__card__front--specific">
                                    <!-- <input v-if="!individualInfoEdit" type="text" placeholder="企业ID/学号" name="cid" id="cid"> -->
                                    <div v-if="individualInfoEdit" class="profile__card__front__title--sel"
                                        @click="showTitle()">
                                        <div class="profile__card__front__title--sel__show">
                                            <input v-model="titleValue" type="text" placeholder="头衔" name="title"
                                                id="title">
                                            <svg>
                                                <use xlink:href="../../assets/img/all.svg#icon-chevron-down"></use>
                                            </svg>
                                        </div>
                                        <div class="profile__card__front__title--list" v-show="titleShow">
                                            <ul>
                                                <li @click="getTitleValue(index,item)" v-for="(item,index) in titleList"
                                                    :key="index">{{item.title}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span>{{userInfo.TITLE}}</span>
                                    </div>
                                </div>

                            </div>
                            <div class="profile__card__front__gender">
                                <label for="gender">性别：</label>
                                <div class="profile__card__front--specific">
                                    <div v-if="individualInfoEdit" class="profile__card__front__gender--sel"
                                        @click="showGender()">
                                        <div class="profile__card__front__gender--sel__show">
                                            <input v-model="genderValue" type="text" placeholder="性别" name="gender"
                                                id="gender">
                                            <svg>
                                                <use xlink:href="../../assets/img/all.svg#icon-chevron-down"></use>
                                            </svg>
                                        </div>
                                        <div class="profile__card__front__gender--list" v-show="genderShow">
                                            <ul>
                                                <li @click="getGenderValue(index,item)" v-for="(item,index) in gender"
                                                    :key="index">{{item.gender}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div v-if="!individualInfoEdit" class="profile__card__front--specific__text">
                                        <span>{{userInfo.GENDER}}</span>
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
    import axios from '../../store/axios-auth';
    import { uploadFile } from "../../store/uploadFile";
    // import mime from "mime";
    export default {
        data: function () {
            return {
                avatar: "https://example",
                realNameEdit: false,
                realName: "",
                companyEdit: false,
                company: "",
                departmentEdit: false,
                department: "",
                devices: [],
                majorEdit: false,
                major: "",
                titleEdit: false,
                title: "",
                cidEdit: false,
                cid: "",
                emailEdit: false,
                email: "example@example.com",
                mobileEdit: false,
                mobile: "",
                birthdayEdit: false,
                birthday: "1999-09-09",
                genderShow: false,
                genderValue: "",
                gender: [
                    { "gender": "男" },
                    { "gender": "女" },
                    { "gender": "无法分辨" },
                ],
                titleShow: false,
                titleValue: "",
                titleList: [
                    { "title": "学生" },
                    { "title": "讲师" },
                    { "title": "副教授" },
                    { "title": "教授" },
                ],
                individualInfoEdit: false,
                timerShow: false,
                timerCount: 0,
                timer: null,
                borderhover: false,
                dragAndDropCapable: false,
                files: [],
                oldPass: "",
                newPass: "",
                newPassC: "",
                uploadPercentage: 0,
                currentLoad: "",
            }
        },
        mounted: function () {
            let _this = this;
            var dropbox = document.getElementById('file-drag-drop');
            dropbox.addEventListener("drop", this.enentDrop, false)
            dropbox.addEventListener("dragleave", function (e) {
                
                
                e.preventDefault();
                _this.borderhover = false;
            });
            dropbox.addEventListener("dragenter", function (e) {
                e.stopPropagation();
                e.preventDefault();
                _this.borderhover = true;
            });
            dropbox.addEventListener("dragover", function (e) {
                e.stopPropagation();
                e.preventDefault();
                _this.borderhover = true
            });

        },
        watch: {

        },
        computed: {
            userInfo() {
                return this.$store.state.userProfile;
            }
        },
        created() {
            this.$store.dispatch("getUserProfile").then(() => {
                console.log("获取个人情报信息");
            }).catch((err) => {
                console.error(err);
            });

            this.titleValue = this.$store.state.userProfile.TITLE;
            this.genderValue = this.$store.state.userProfile.GENDER;

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
            updatePassword: function () {
                if (!this.newPass || !this.newPassC || !this.oldPass) {
                    this.$toast.error({ title: "出错啦", message: "输入不能为空" });
                    return false
                } else if (this.newPass != this.newPassC) {
                    this.$toast.error({ title: "出错啦", message: "新密码两次输入不一致" });
                    return false;
                }
                let payload = {
                    password: this.newPass,
                    old: this.oldPass
                }
                this.$store.dispatch("updatePassword", payload).then((res) => {
                    if (res == "rs-102") {
                        this.$toast.success({ title: "成功啦", message: "您的密码已经更新" });
                    } else {
                        this.$toast.error({ title: "出错啦", message: "密码更改失败" });
                    }
                }).catch((err) => {
                    console.error(err);
                    this.$toast.error({ title: "出错啦", message: "密码更改失败" });
                })
            },
            showGender: function () {
                this.genderShow = !this.genderShow
            },
            getGenderValue: function (index, item) {
                event.stopPropagation();
                this.genderValue = item.gender;
                this.genderShow = false;
            },
            showTitle: function () {
                this.titleShow = !this.titleShow
            },
            getTitleValue: function (index, item) {
                event.stopPropagation();
                this.titleValue = item.title;
                this.titleShow = false;
            },
            editIndividualInfo: function () {
                this.individualInfoEdit = !this.individualInfoEdit;
            },
            submitIndividualInfo: function () {
                let payload = {
                    AVATAR: this.userInfo.AVATAR,
                    BIRTHDAY: this.userInfo.BIRTHDAY,
                    DEPARTMENT: this.userInfo.DEPARTMENT,
                    DEVICES: this.userInfo.DEVICES,
                    EMAIL: this.userInfo.EMAIL,
                    GENDER: this.genderValue,
                    MAJOR: this.userInfo.MAJOR,
                    COMPANY_ID: this.userInfo.COMPANY_ID,
                    NAME: this.userInfo.NAME,
                    TITLE: this.titleValue,
                    WORKPLACE: this.userInfo.WORKPLACE,
                    EDITAVATAR:false
                }
                let flag = this.checkProfile(payload);
                if (flag == true) {
                    this.$store.dispatch("updateIndividual", payload).then((res) => {
                        console.log("添加姓名成功返回");
                        if (res == "rs-102") {
                            this.$toast.success({ title: "成功", message: "信息更新成功" })
                        }
                    }).catch((err) => {
                        console.error(err);
                        this.$toast.error({ title: "失败", message: "肯定是哪儿出问题啦" })
                    })
                }
                this.individualInfoEdit = !this.individualInfoEdit
            },
            getSMSCode: function () {
                const TIME_COUNT = 300;
                if (!this.timer) {
                    this.timerCount = TIME_COUNT;
                    this.timerShow = true;
                    this.timer = setInterval(() => {
                        if (this.timerCount > 0 && this.timerCount <= TIME_COUNT) {
                            this.timerCount--;
                        } else {
                            this.timerShow = false;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            enentDrop: function (e) {
                this.borderhover = false
                this.borderWeight = false
                e.stopPropagation();
                e.preventDefault();

                for (let i = 0; i < e.dataTransfer.files.length; i++) {

                    if (/\.(jpe?g|png|gif)$/i.test(e.dataTransfer.files[i].name)) {
                        this.files.push(e.dataTransfer.files[i]);
                        console.log(e.dataTransfer.files[i]);
                        this.getImagePreviews();
                    } else {
                        this.$toast.error({ title: "注意!注意!注意!", message: "该文件类型暂不支持" });
                    }
                }
            },
            getImagePreviews() {
                for (let i = 0; i < this.files.length; i++) {
                    if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
                        let reader = new FileReader();
                        reader.addEventListener("load", function () {
                            this.$refs['preview' + parseInt(i)][0].src = reader.result;
                        }.bind(this), false);
                        reader.readAsDataURL(this.files[i]);
                    }
                }
            },
            checkProfile: function (payload) {
                let flag = false;
                if (payload.AVATAR && payload.BIRTHDAY
                    && payload.DEPARTMENT && payload.MAJOR && payload.EMAIL
                    && payload.GENDER && payload.COMPANY_ID && payload.NAME
                    && payload.TITLE && payload.WORKPLACE && payload.DEVICES) {
                    flag = true
                }
                return flag;
            },
            removeFile(file) {
                this.files = this.files.filter((f) => {
                    console.log(file.name)

                    return f != file;
                });
                console.log(this.files);
                this.getImagePreviews();
            },
            uploadBusiness(index) {
                console.log(index);
                this.currentIndex = index;
                this.getPass();
            },
            getPass() {
                const userId = localStorage.getItem("userId")
                const config = { headers: { Authorization: localStorage.getItem("token") } };
                const fileType = this.files[this.currentIndex].name.split(".").pop();
                // let mimeType = mime.getType(fileType)
                // if (fileType == "jpg") {
                //     mimeType = "image/" + fileType
                // } else {
                //     mimeType = mime.getType(fileType)
                // }
                // let tag = [];
                // const data = {
                //     type: mimeType,
                //     name: this.files[this.currentIndex].name,
                //     size: this.files[this.currentIndex].size,
                //     duration: this.duration[this.currentIndex],
                //     tag: tag,
                //     editflag: false,
                //     userId: userId
                // };
                let baseUrl = "https://rs-learning-resources.s3.cn-northwest-1.amazonaws.com.cn/user/avatar/"

                let payload = {
                    AVATAR: baseUrl + userId + "." + fileType,
                    BIRTHDAY: this.userInfo.BIRTHDAY,
                    DEPARTMENT: this.userInfo.DEPARTMENT,
                    DEVICES: this.userInfo.DEVICES,
                    EMAIL: this.userInfo.EMAIL,
                    GENDER: this.genderValue,
                    MAJOR: this.userInfo.MAJOR,
                    COMPANY_ID: this.userInfo.COMPANY_ID,
                    NAME: this.userInfo.NAME,
                    TITLE: this.titleValue,
                    WORKPLACE: this.userInfo.WORKPLACE,
                    EDITAVATAR:true
                }

                axios.put("rs-user/profile/UPDATEPERSONALMESSAGE", payload, config)
                    .then(response => {
                        console.log(response);
                        console.log("写入数据库成功");
                        let { data, statusNumber } = response.data;
                        if (statusNumber !== "rs-120") {
                            throw new Error("upload attributes error");
                        }
                        const that = this;
                        let AWSConfig = { ...data.Credentials, path: "user/avatar" , id: data.id ,flag:"avatar" ,userId:userId};
                        const upload = (err, data) => {
                            // that.screenLoading = false;
                            if (err || !data.ETag) {
                                // console.error(err, data);
                                that.$toast.error({ title: "上传失败", message: "出错啦，请重新上传！" })
                            } else {
                                that.$toast.success({ title: "上传成功", message: "继续上传，或者创建课程吧" })
                            }
                        };
                        const progress = event => {
                            let process = Number((event.loaded * 100) / event.total);
                            that.currentLoad = event.loaded;
                            // this.$set(this.uploadPercentage, this.currentIndex, this.uploadPercentage[this.currentIndex]);
                            that.uploadPercentage = `${parseInt(process)}%`;
                            // that.test = `${parseInt(process)}%`;
                        };
                        uploadFile(this.files[this.currentIndex], AWSConfig, upload, progress);

                    }).catch(error => {
                        console.error(error);
                    });
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