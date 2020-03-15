<template>
    <header class="header">
        <nav class="navigator">
            <img src="../../assets/img/favicon.png" alt="Our logo" class="header__logo">
            <ul class="top-nav">
                <li class="top-nav__item"><a href="#" class="top-nav__link">产品</a></li>
                <li class="top-nav__item"><a href="" class="top-nav__link">服务</a></li>
            </ul>
        </nav>

        <h1 class="heading-title">研创小课堂</h1>
        <div class="header__seperator"></div>
        <h3 class="heading-1">我们每一天都在关注您的成长</h3>
        <a href="#popup" class="btn btn--primary">加入我们</a>
    </header>
</template>

<script></script>
<style lang="scss">
.header {
    background-color: $color-grey-dark-1;
    grid-column: sidebar-start / full-end;
    background-image: linear-gradient(to right bottom, rgba($color-secondary, .9),rgba($color-secondary, .9)), 
        url(../../assets/img/hero.jpg);
    background-size: cover;
    background-position: center;
    // padding:8rem;
    padding-top: 4rem;

    display: grid;
    grid-template-rows: min-content min-content repeat(2,minmax(6rem,min-content))  max-content;
    grid-template-columns: 1fr ;
    grid-row-gap: 1.5rem;
    justify-content: center;
    justify-items: center;
    align-items: center;

    &__logo {
        margin-left: 5rem;
        height: 5rem;
        justify-self: left;
    }

    &__seperator {
        // justify-self: center;
        align-self: center;
        height: 3px;
        width: 33%;
        background-color: $color-grey-light-1;
    }
}

.navigator {
    margin-right: 5rem;
    justify-self: stretch;
    display: grid;
    grid-template-columns: [htop-start] 1fr [htop-end mid-start ] 1fr [mid-end];
}

.top-nav {
    font-size: 2rem;
    list-style: none;
    margin-top: .5rem;
    display: grid;
    grid-template-columns: repeat(4,minmax(min-content, max-content));
    justify-content:right;

    &__item {
        position: relative;

        &:not(:last-child){
            margin-right: .5rem;
        }
    }

    &__item::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background-color: $color-primary;
        transform: scaleX(0);
        // transform-origin: bottom;
        transition: transform .2s, 
                    height .4s cubic-bezier(1,0,0,1) .2s,
                    background-color .1s;
    }

    &__item:hover::before,
    &__item--active::before {
        transform: scaleX(1);
        height: 100%;
    }

    &__link:link,
    &__link:visited {
        color: $color-grey-light-1;
        text-decoration: none;
        text-transform: uppercase;
        display: block;
        padding: 1.5rem 3rem;
        position: relative;
        z-index: 10;

        display: flex;
        align-items: center;
    }
}

</style>