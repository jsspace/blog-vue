/**
 * Created by minyi on 2017/11/28.
 */
import Vue from 'vue';
import Router from 'vue-router';
import PostList from './components/posts-list.vue';
import PostCreate from './components/posts-edit.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/space/admin/posts-list',
            name: 'post-list',
            component: PostList
        },
        {
            path: '/space/admin/posts-edit',
            name: 'post-edit',
            component: PostCreate
        }
    ]
});