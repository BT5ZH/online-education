<template>
    <div class="profilePop" id="popup">
        <div class="profilePop__content">
            <div class="profileBlock">
                <div class="profileBlock__b">

                        <div class="form__title">
                            <h2 class="heading-secondary">重新设计</h2>
                        </div>
                        <div class="form-middle">
                            重新设计
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
                username: '',
                password: '',
                password_: '',
                regisflag: 'login',
                isLog: false
            }
        },
        watch: {
            
        },
        methods: {

            
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