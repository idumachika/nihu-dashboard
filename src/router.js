import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store/store'

Vue.use(Router);

function authenticate(to, from, next) {
    if (Store.getters.IS_AUTHENTICATED)
        next();
    else
        next(from.fullPath);
}

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            beforeEnter: (to, from, next) => authenticate(to, from, next),
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            beforeEnter: (to, from, next) => {
                Store.dispatch('UNAUTHORISE');
                next('/');
            }
        }
    ]
})
