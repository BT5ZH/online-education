<template>
    <main class="rs-learning">
        <course-info></course-info>
        <div class="course__learn">
            <div class="video-block">
                <video class="video-block__content" preload="auto" controls>
                    <source src="../../../assets/video/test.mp4" type="video/mp4">
                    Your browser is not supported!
                </video>
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