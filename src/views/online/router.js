import Courses from './courses/Courses.vue';
import CourseEnrolled from './courses/CourseEnrolled.vue';
import Learning from './learning/Learning.vue';
import MyCourses from './learning/MyCourses.vue';
// import VideoBlock from './learning/UserVideoBlock.vue';
import Upload from './upload/Upload.vue';
import Cook from './cook/Cook.vue';
import Template from './cook/Template.vue';
import Test from './test/Test.vue';
import Profile from './profile/Profile.vue';
import Todo from './todo/Todo.vue';
import TodoTwo from './todo/TodoTwo.vue';
import Payment from './pay/payment.vue';

export const routes = [
    { path: '/', name: 'courses', component: Courses },
    { path: '/courseEnrolled', name: 'enrolled', component: CourseEnrolled },
    { path: '/learning/:authorId/:courseId', name:'learning', component: Learning},
    { path: '/learning', name:'myCourses', component: MyCourses},
    { path: '/upload', component: Upload },
    { path: '/cook-top', name:'cookFirst', component: Cook},
    // { path: '/cook-template', component: Template },
    { path: '/cook-template/:courseId', name:'editCourse', component: Template },
    { path: '/profile', name:'profile', component: Profile},
    { path: '/test', component: Test },
    { path: '/todo', component: Todo },
    { path: '/todotwo', component: TodoTwo },
    { path: '/payment/:courseId',name:'payment', component: Payment },
    { path: '*', redirect: '/' }
]