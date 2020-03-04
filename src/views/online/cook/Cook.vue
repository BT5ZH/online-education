<template>
    <main class="rs-cooking">
        <div class="cooking-area">
            <div class="cooking-card">
                <router-link class="cooking-card__add" to="/cook-template">
                    <svg  >
                        <use xlink:href="../../../assets/img/all.svg#icon-plus"></use>
                    </svg>
                </router-link>
                <div class="cooking-card__title">
                    点“+”号，创建课程
                </div>
            </div>
            <div class="cooking-card">
                <img src="../../../assets/img/house-3.jpeg" alt="House 3" class="cooking-card__img">
                <h5 class="cooking-card__name">Beautiful Family House</h5>
                <div class="cooking-card__title">
                    计算机基础
                </div>
            </div>
            <div class="cooking-card">
                <img src="../../../assets/img/house-3.jpeg" alt="House 3" class="cooking-card__img">
                <h5 class="cooking-card__name">Beautiful Family House</h5>
                <div class="cooking-card__title">
                    计算机基础
                </div>
            </div>

        </div>

    </main>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        created() {
            this.$store.dispatch("getUserCourses").then(() => {
                    console.log("-----------");
                }).catch((err) => {
                    console.error(err);
                });
        },
        methods: {
            goDetail() {

            }
        },
    }
</script>