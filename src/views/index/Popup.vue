<template>
    <div class="popup" id="popup">
        <div class="popup__content">
            <div class="lg">
                <div class="lg__b">
                    <form action="#" class="form">
                        <div class="form__title">
                            <h2 class="heading-secondary">开始学习吧</h2>
                        </div>
                        <div class="form-middle">
                            <div class="form__group">
                                <input v-model="username" type="text" class="form__input" placeholder="邮箱 / 手机号"
                                    id="username" name="username" required>
                                <label for="username" class="form__label">用户名</label>
                            </div>
                            <div class="form__group">
                                <input v-model="password" type="password" class="form__input" placeholder="密码"
                                    id="password" name="password" required>
                                <label for="password" class="form__label">密码</label>
                            </div>
                            <div class="form__group" v-if="regisflag=='reg'">
                                <input v-model="password_" type="password" class="form__input" placeholder="确认密码"
                                    id="password_" name="password_" required>
                                <label for="password_" class="form__label">密码</label>
                            </div>
                        </div>
                        <div class="form__code" v-if="regisflag=='reg'">
                            <input v-model="passcode" type="text" class="form__code__txt" placeholder="验证码"
                                id="passcode" name="passcode">
                            <button type="button" class="form__code__btn" @click="sendPassCode">验证码</button>
                        </div>

                        <div class="form__group form__role">
                            <div class="form__radio-group">
                                <input type="radio" class="form__radio-input" id="small" value="login"
                                    v-model="regisflag">
                                <label for="small" class="form__radio-label">
                                    <span class="form__radio-button"></span>
                                    登录
                                </label>
                            </div>
                            <div class="form__radio-group">
                                <input type="radio" class="form__radio-input" id="large" value="reg"
                                    v-model="regisflag">
                                <label for="large" class="form__radio-label">
                                    <span class="form__radio-button"></span>
                                    注册
                                </label>
                            </div>

                        </div>
                        <div class="form__group form__btn">
                            <a href="online.html" class="btn btn--login" @click.prevent="submit">开始学习&rarr;</a>
                        </div>
                        <!-- <button @click="submit">button</button> -->
                    </form>
                </div>
            </div>
            <a href="#section-tours" class="popup__close">&times;</a>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                username: '',
                password: '',
                password_: '',
                passcode: '',
                regisflag: 'login',
                isLog: false,
                tempType: 'REGPOST',
                codeType: ''
            }
        },
        watch: {
            // password() {
            //     const rule1 = /[^a-zA-Z/a-zA-Z0-9/`~!@$%^&()\-+=<>?:"{}|,./;'_#*·~！@￥%……&（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
            //     if (rule1.test(this.password)) {
            //         this.$toast.error({
            //             title: "error",
            //             message: "密码不支持此符号, 请更换其他符号"
            //         });
            //         this.password = this.password.replace(rule1);
            //     }
            // },
            regisflag: function () {
                if (this.regisflag) {
                    this.username = '';
                    this.password = '';
                    this.password_ = '';
                } else {
                    this.username = '';
                    this.password = '';
                }
            }
        },
        methods: {
            submit() {
                switch (this.regisflag) {
                    case "reg":
                        console.log("+++++")
                        this.registerBusiness();
                        break;
                    case "login":
                        console.log("=====")
                        this.loginBusiness();
                        break;
                    default:
                        break;
                }


            },
            registerBusiness() {
                console.log("我要注册");
                if (this.checkRegister()) {
                    const formData = {
                        username: this.username,
                        password: this.password,
                        tempType: this.tempType,
                        codeType: this.codeType,
                        code: this.passcode
                    }
                    console.log(formData);

                    this.$http.post("rs-user/register",
                        {
                            username: this.username,
                            password: this.password,
                            tempType: this.tempType,
                            codeType: this.codeType,
                            code: this.passcode
                        })
                        .then(res => {
                            console.log(res);
                            console.log("结束");
                            this.$toast.success({ title: "注册成功", message: "可以登录了哦" });
                            this.regisflag = "reg"

                        }, err => {
                            console.log(err);
                        });
                }
            },
            loginBusiness() {
                if (this.checkLogin()) {

                    let username = this.username;
                    let password = this.password;
                    const formData = {
                        password,
                        username,
                    }
                    this.$store.dispatch("login", formData).then(() => {
                        const result = this.$store.getters.isAuthenticated;
                        console.log("登录结果" + result);
                        if (!result) {
                            this.$toast.error({ title: "登录失败", message: "出错啦！" })
                        } else {
                            this.$toast.success({ title: "登录成功", message: "页面即将跳转" })
                            window.location.href = "online.html";
                        }

                    }, () => {

                    })
                }
            },
            checkRegister() {
                if (!this.username || !this.password) {
                    console.log("11111");
                    this.$toast.error({ title: "输入有误", message: "用户名/密码不能为空" });
                    return false;
                } else if (this.password != this.password_) {
                    console.log("22222");
                    this.$toast.error({ title: "输入有误", message: "两次密码不一致" });
                    return false;
                } else if (!this.passcode) {
                    console.log("33333");
                    this.$toast.error({ title: "输入有误", message: "请输入验证码" });
                    return false;
                }
                const isPhone = /^1[3456789]\d{9}$/;
                if (isPhone.test(this.username)) {
                    console.log("--+++++");
                    this.codeType = "PHONE";
                    return true;
                } else {
                    console.log("44444");
                    const isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if (isEmail.test(this.username)) {
                        this.codeType = "EMAIL";
                        return true;
                    } else {
                        this.$toast.error({
                            title: "注意",
                            message: "请输入正确的手机或邮箱符号"
                        });
                        return false
                    }
                }
            },
            checkLogin() {
                console.log("guolaia====")
                if (!this.username) {
                    this.$toast.warn({ title: "请注意", message: "用户名不能为空" });
                    return false;
                }
                if (!this.password) {
                    this.$toast.warn({ title: "请注意", message: "密码不能为空" });
                    return false;
                }
                const isPhone = /^1[3456789]\d{9}$/;
                if (isPhone.test(this.username)) {
                    console.log("--+++++");
                    this.codeType = "PHONE";
                    return true;
                } else {
                    const isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if (isEmail.test(this.username)) {
                        this.codeType = "EMAIL";
                        return true;
                    } else {
                        this.$toast.error({
                            title: "注意",
                            message: "请输入正确的手机或邮箱符号"
                        });
                        return false
                    }
                }
            },
            clearInputInfo: function () {
                this.username = "",
                    this.password = "",
                    this.password_ = ""
            },
            sendPassCode: function () {
                let flag = false;
                if (!this.username || !this.password) {
                    console.log("11111");
                    this.$toast.error({ title: "输入有误", message: "用户名/密码不能为空" });
                    flag = false;
                }
                const isPhone = /^1[3456789]\d{9}$/;
                if (isPhone.test(this.username)) {
                    console.log("--+++++");
                    this.codeType = "PHONE";
                    flag = true;
                } else {
                    console.log("44444");
                    const isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if (isEmail.test(this.username)) {
                        this.codeType = "EMAIL";
                        flag = true;
                    } else {
                        flag = false
                    }
                }
                if (flag == true) {
                    console.log("发验证码");
                    console.log(this.codeType)
                    console.log(this.username)
                    this.$http.post("rs-user/register/code",
                        {
                            tempType: this.codeType,
                            tos: this.username
                        })
                        .then(res => {
                            console.log(res);
                            this.$toast.success({ title: "验证码已发", message: "请勿将验证码透漏给他人" });
                            this.regisflag = "reg"

                        }, err => {
                            console.log(err);
                        });
                } else {
                    this.$toast.error({
                        title: "注意",
                        message: "请输入正确的手机或邮箱符号"
                    });
                }
            }
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