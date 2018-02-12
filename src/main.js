/**
 * Created by minyi on 2017/11/28.
 */
import Vue from 'vue';
import resource from 'vue-resource';
import router from './router.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import app from './app.vue';


Vue.use(resource);
Vue.use(ElementUI);


new Vue({
    el: '#app',
    router,
    render: h => h(app)
});