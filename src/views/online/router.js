import Courses from './courses/Courses.vue';
import Learning from './learning/Learning.vue';
// import VideoBlock from './learning/UserVideoBlock.vue';
import Upload from './upload/Upload.vue';
import Cook from './cook/Cook.vue';
import Template from './cook/Template.vue';
import Test from './test/Test.vue';
import Todo from './todo/Todo.vue';
import TodoTwo from './todo/TodoTwo.vue';

export const routes = [
    { path: '/', name: 'courses', component: Courses },
    { path: '/learning/:courseId', name:'learning', component: Learning, 
        // children:[
        //     {path:'video/:rsId',component:VideoBlock}
        // ] 
    },
    { path: '/upload', component: Upload },
    { path: '/cook-top', component: Cook},
    { path: '/cook-template', component: Template },
    { path: '/test', component: Test },
    { path: '/todo', component: Todo },
    { path: '/todotwo', component: TodoTwo },
    { path: '*', redirect: '/' }
]