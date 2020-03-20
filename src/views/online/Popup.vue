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
                                    西安
                                </div>
                                <div class="user__card__footer--right">
                                    西安
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
                                    <input v-if="realNameEdit" type="text" class="user__card__back__input" name="realName"
                                        placeholder="姓名">
                                </div>
                                <div class="user__card__back__inner--op">
                        
                                    <svg class="" @click="editRealName">
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
                                <div class="user__card__back__inner--op">
                                    <svg class="" @click="editCompany">
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
                                <div class="user__card__back__inner--op">
                        
                                    <svg class="" @click="editRealName">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--title">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!titleEdit" for="">
                                        <span v-if="!userInfo.TITLE">头衔</span>
                                        <span v-if="userInfo.TITLE">{{userInfo.TITLE}}</span>
                                    </label>
                                    <input v-if="titleEdit" type="text" class="user__card__back__input" name="title"
                                        placeholder="头衔">
                                </div>
                                <div class="user__card__back__inner--op">
                        
                                    <svg class="" @click="editRealName">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--cid">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!cidEdit" for="">
                                        <span v-if="!userInfo.COMPANY_ID">企业ID</span>
                                        <span v-if="userInfo.COMPANY_ID">{{userInfo.COMPANY_ID}}</span>
                                    </label>
                                    <input v-if="cidEdit" type="text" class="user__card__back__input" name="cid"
                                        placeholder="企业ID">
                                </div>
                                <div class="user__card__back__inner--op">
                                    <svg class="" @click="editRealName">
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
                                <div class="user__card__back__inner--op">
                        
                                    <svg class="" @click="editRealName">
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
                                <div class="user__card__back__inner--op">
                        
                                    <svg class="" @click="editRealName">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="user__card__back__inner user__card__back--birthday">
                                <div class="user__card__back__inner--show">
                                    <label v-if="!mobileEdit" for="">
                                        <span v-if="!userInfo.BIRTHDAY">生年月日</span>
                                        <span v-if="userInfo.BIRTHDAY">{{userInfo.BIRTHDAY}}</span>
                                    </label>
                                    <input v-if="mobileEdit" type="text" class="user__card__back__input" name="birthday"
                                        placeholder="生年月日">
                                </div>
                                <div class="user__card__back__inner--op">
                        
                                    <svg class="" @click="editRealName">
                                        <use xlink:href="../../assets/img/all.svg#icon-edit"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    

                </div>
                <div class="profile__r">
                    lalala
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
                realNameEdit: true,
                companyEdit: true,
                departmentEdit: true,
                titleEdit: true,
                cidEdit: true,
                emailEdit: true,
                mobileEdit: true,
                birthdayEdit: true

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

            },
            editCompany: function () {

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