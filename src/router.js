/**
 * Created by minyi on 2017/11/28.
 */
import Vue from 'vue';
import Router from 'vue-router';
import PostList from './components/posts-list.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/space/admin/posts-list',
            name: 'post-list',
            component: PostList
        }
    ]
});