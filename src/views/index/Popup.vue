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
                                <input v-model="username" type="text" class="form__input" placeholder="用户名 / 手机号"
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
                regisflag: 'login',
                isLog: false
            }
        },
        watch: {
            username() {
                const rule1 = /[`~!@$%^&()\-+=<>?:"{}|,./;'#*·~！@￥%……&（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
                const rule2 = /[^_A-Za-z0-9\u4e00-\u9fa5]/g;
                if (rule1.test(this.account) || rule2.test(this.account)) {
                    this.$toast.error({
                        type: "error",
                        message: "账号不支持此符号, 请更换其他符号"
                    });
                    this.account = this.account.replace(rule1, "");
                    this.account = this.account.replace(rule2, "");
                }
            },
            password() {
                const rule1 = /[^a-zA-Z/a-zA-Z0-9/`~!@$%^&()\-+=<>?:"{}|,./;'_#*·~！@￥%……&（）——\-+={}|《》？：“”【】、；‘’，。、]/g;
                if (rule1.test(this.password)) {
                    this.$toast.error({
                        type: "error",
                        message: "密码不支持此符号, 请更换其他符号"
                    });
                    this.password = this.password.replace(rule1);
                }
            }
        },
        methods: {
            submit() {
                switch (this.regisflag) {
                    case "reg":
                        this.registerBusiness();

                        break;
                    case "login":
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
                    }
                    console.log(formData);

                    this.$http.post("rs-user/register",
                        {
                            username: this.username,
                            password: this.password
                        })
                        .then(res => {
                            console.log(res);
                            console.log("结束");
                            this.$toast.success({ title: "注册成功", message: "可以登录了哦" });
                            this.regisflag = "reg"
                            // window.location.href="online.html";

                        }, err => {
                            console.log(err);
                        })
                }
            },
            loginBusiness() {
                if (this.checkLogin) {
                    console.log("我要登录");
                    let username = this.username;
                    let password = this.password;

                    const formData = {
                        password,
                        username,
                    }
                    this.$store.dispatch("login", formData).then(() => {
                        const result = this.$store.getters.isAuthenticated;
                        console.log("登录结果" + result);
                        if ((!result)) {
                            this.$toast.error({ title: "登录失败", message: "出错啦！" })
                        } else {
                            this.$toast.success({ title: "登录成功", message: "页面即将跳转" })
                        }
                        window.location.href="online.html";
                    }, () => {

                    })
                }
            },
            checkRegister() {
                console.log(this.username)
                console.log(this.password)
                if (!this.username || !this.password) {
                    this.$toast.error({ title: "输入有误", message: "用户名/密码不能为空" });
                    return false;
                } else if (this.password != this.password_) {
                    this.$toast.error({ title: "输入有误", message: "两次密码不一致" });
                    return false;
                }
                return true
            },
            checkLogin() {
                if (!this.user) {
                    this.$toast.warning({ title: "请注意", message: "用户名不能为空" });
                    return false;
                }
                if (!this.password) {
                    this.$toast.warning({ title: "请注意", message: "密码不能为空" });
                    return false;
                }
                return true;
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