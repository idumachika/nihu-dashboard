import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login/Login.vue';
import Store from './store/store';
import Dashboard from './views/Dashboard/Dashboard.vue';
import AddMusicCategory from './views/AddMusicCategory/AddMusicCategory.vue'
import AddMusic from './views/AddMusic/AddMusic.vue'
import AddTvShow from './views/AddTvShow/AddTvShow.vue';
import AddTvShowCategory from './views/AddTvShowCategory/AddTvShowCategory.vue';
import ListTvShow from './views/ListTvShow/ListTvShow.vue';
import ListTvShowCategory from './views/ListTvShowCategory/ListTvShowCategory.vue';
import ListCategory from './views/ListCategory/ListCategory.vue';
import ListMusic from './views/ListMusic/ListMusic.vue';
import AddOriginal from './views/AddOriginal/AddOriginal.vue';
import AddOriginalCategory from './views/AddOriginalCategory/AddOriginalCategory.vue';
import ListOriginal  from './views/ListOriginal/ListOriginal.vue';
import ListOriginalCategory from './views/ListOriginalCategory/ListOriginalCategory.vue';
import ListRecap from './views/ListRecap/ListRecap.vue';
import AddRecap from './views/AddRecap/AddRecap.vue';
import ListView from './views/ListView/ListView.vue';
import AddView from './views/AddView/AddView.vue';
import AddNihuTv from './views/NihuTvAdd/NihuAddTv.vue'



Vue.use(Router);

const router = new Router({
    mode: 'history',
    // base: process.env.NODE_ENV === 'production' ? '/nihu-music' : '/',

    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                public: true,  // Allow access to even if not logged in
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            // beforeEnter: (to, from, next) => authenticate(to, from, next),
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
            component: Dashboard,
        },
        {
            path: '/logout',
            name: 'logout',
        },
        {
            path: '/add-tv-show',
            name: 'AddTvShow',
            component: AddTvShow,
        },
        {
            path: '/add-music-category',
            name: 'AddMusicCategory',
            component: AddMusicCategory,
        },
        {
            path: '/add/music',
            name: 'AddMusic',
            component: AddMusic,
        },
        {
            path: '/list/category',
            name: 'ListCategory',
            component: ListCategory,
        },
        {
            path: '/list/music',
            name: 'ListMusic',
            component: ListMusic,
        },
        {
            path: '/tv-show/category',
            name: 'AddTvShowCategory',
            component: AddTvShowCategory,
        },

        {
            path: '/list/tv-show',
            name: 'ListTvShow',
            component: ListTvShow,
        },
        {
            path: '/list/tv-show-category',
            name: 'ListTvShowCategory',
            component: ListTvShowCategory,
        },
        {
            path: '/add/original',
            name: 'AddOriginal',
            component: AddOriginal,
        },
        {
            path: '/add/original-categroy',
            name: 'AddOriginalCategory',
            component: AddOriginalCategory,
        },
        {
            path: '/list/list-original',
            name: 'ListOriginal',
            component: ListOriginal,
        },
        {
            path: '/list/list_original_categroy',
            name: 'ListOriginalCategory',
            component: ListOriginalCategory,
        },
        {
            path: '/list/Recap',
            name: 'listRecap',
            component: ListRecap,
        },
        {
            path: '/add/Recap',
            name: 'addRecap',
            component: AddRecap,
        },
        {
            path: '/list/view',
            name: 'listView',
            component: ListView,
        },
        {
            path: '/add/View',
            name: 'addView',
            component: AddView,
        },
        {
            path: '/add/NihuTv',
            name: 'AddNihuTv',
            component: AddNihuTv,
        },
    ]
});


router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    const loggedIn = Store.getters.IS_AUTHENTICATED;

    if (!isPublic && !loggedIn) {
        return next({
            name: 'login',
        });
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next({name: 'dashboard'});
    }

    next();
});

export default router;
