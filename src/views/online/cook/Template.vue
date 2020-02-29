<template>
    <main class="rs-learning">
        <course-info></course-info>
        <div class="rs__select">
            <div class="rs__select__layout ">
                <div class="rs__card"> 
                    <svg class="rs__card__extension rs__card__extension--1">
                        <use xlink:href="../../../assets/img/all.svg#icon-file-video"></use>
                    </svg> 
                    <h5 class="rs__card__name">Beautiful Family House</h5>
                </div>
                <div class="rs__card">   
                </div>
                
                
            </div>
            <info-block></info-block>
        </div>
    </main>
</template>
<script>
    import CourseInfo from './CourseInfo';
    import InfoBlock from './InfoBlock';
export default {
    components:{
        'course-info':CourseInfo,
        'info-block': InfoBlock
    }
}
</script>