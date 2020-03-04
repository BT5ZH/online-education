<template>
    <main class="rs-learning">
        <div class="course__info">
            <div class="cs">
                <div class="cs__header">
                    <span class="cs__header-text">课程内容</span>
                    <svg class="search__icon">
                        <use xlink:href="img/sprite.svg#icon-key"></use>
                    </svg>
                </div>
                <div class="cs__list">
                    <div class="cs__list__title">
                        <div class="cs__list__title--text">
                            <span>第一节：欢迎来到python学习</span>
                            <span class="heading-7 heading-7--dark">7 / 13 &nbsp;|&nbsp; 33 分钟</span>
                        </div>

                        <svg class="search__icon">
                            <use xlink:href="img/sprite.svg#icon-key"></use>
                        </svg>
                    </div>
                    <ul class="cs__list__nav">
                        <li class="cs__list__nav__item">
                            <svg class="user-nav__icon">
                                <use xlink:href="img/sprite2.svg#icon-bookmark"></use>
                            </svg>
                            <div class="link-item">
                                <a href="#" class="cs__list__nav__link">1.python学习简介</a>
                                <span class="heading-7 heading-7--dark">3分钟</span>
                            </div>

                        </li>
                        <li class="cs__list__nav__item">
                            <svg class="user-nav__icon">
                                <use xlink:href="img/sprite2.svg#icon-bookmark"></use>
                            </svg>
                            <div class="link-item">
                                <a href="#" class="cs__list__nav__link">2.为什么要学习python</a>
                                <span class="heading-7 heading-7--dark">3分钟</span>
                            </div>

                        </li>
                        <li class="cs__list__nav__item">
                            <svg class="user-nav__icon">
                                <use xlink:href="img/sprite2.svg#icon-bookmark"></use>
                            </svg>
                            <div class="link-item">
                                <a href="#" class="cs__list__nav__link">3.重要提示及学习该课程的技巧</a>
                                <span class="heading-7 heading-7--dark">3分钟</span>
                            </div>

                        </li>

                    </ul>
                </div>
                <div class="cs__list">
                    <div class="cs__list__title">
                        <div class="cs__list__title--text">
                            <span>第一节：欢迎来到python学习</span>
                            <span class="heading-7 heading-7--dark">7 / 13 &nbsp;|&nbsp; 33 分钟</span>
                        </div>

                        <svg class="search__icon">
                            <use xlink:href="img/sprite.svg#icon-key"></use>
                        </svg>
                    </div>
                    <ul class="cs__list__nav">
                        <li class="cs__list__nav__item">
                            <svg class="user-nav__icon">
                                <use xlink:href="img/sprite2.svg#icon-bookmark"></use>
                            </svg>
                            <div class="link-item">
                                <a href="#" class="cs__list__nav__link">1.python学习简介</a>
                                <span class="heading-7 heading-7--dark">3分钟</span>
                            </div>

                        </li>
                        <li class="cs__list__nav__item">
                            <svg class="user-nav__icon">
                                <use xlink:href="img/sprite2.svg#icon-bookmark"></use>
                            </svg>
                            <div class="link-item">
                                <a href="#" class="cs__list__nav__link">2.为什么要学习python</a>
                                <span class="heading-7 heading-7--dark">3分钟</span>
                            </div>

                        </li>
                        <li class="cs__list__nav__item">
                            <svg class="user-nav__icon">
                                <use xlink:href="img/sprite2.svg#icon-bookmark"></use>
                            </svg>
                            <div class="link-item">
                                <a href="#" class="cs__list__nav__link">3.重要提示及学习该课程的技巧</a>
                                <span class="heading-7 heading-7--dark">3分钟</span>
                            </div>

                        </li>

                    </ul>
                </div>
            </div>

        </div>
        <div class="course__learn">
            <div class="video-block">
                <video class="video-block__content" preload="auto" controls>
                    <source src="../../../assets/video/test.mp4" type="video/mp4">
                    Your browser is not supported!
                </video>
            </div>
            <div class="iblock">
                <div class="iblock__header">
                    <ul class="iblock__nav">
                        <li class="iblock__nav__item iblock__nav__item--active" ><a href="#" class="iblock__nav__link">概要</a></li>
                        <li class="iblock__nav__item"><a href="#" class="iblock__nav__link">公告</a></li>
                        <li class="iblock__nav__item"><a href="#" class="iblock__nav__link">问答</a></li>
                        <li class="iblock__nav__item"><a href="#" class="iblock__nav__link">书签</a></li>
                    </ul>
                </div>
                <div class="iblock__content">
                    <div class="iblock__left">
                        test
                    </div>
                    <div class="iblock__detail">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam sed ipsam maxime a consequatur repellendus, explicabo fugit quisquam soluta tempore. Optio iure provident eaque illum expedita veritatis cum! Aut, quibusdam!
                    </div>
                    
                </div>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    created() {
            this.$store.dispatch("learningTheCourse").then(() => {
                    console.log("-----------");
                }).catch((err) => {
                    console.error(err);
                });
        },
}
</script>