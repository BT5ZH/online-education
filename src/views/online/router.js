import Courses from './courses/Courses.vue';
import Learning from './learning/Learning.vue';
import Upload from './upload/Upload.vue';
import Test from './test/Test.vue';
import Todo from './todo/Todo.vue';
import TodoTwo from './todo/TodoTwo.vue';

export const routes = [
    { path: '/', name: 'courses', component: Courses },
    { path: '/learning', component: Learning },
    { path: '/upload', component: Upload },
    { path: '/test', component: Test },
    { path: '/todo', component: Todo },
    { path: '/todotwo', component: TodoTwo },
    { path: '*', redirect: '/' }
]