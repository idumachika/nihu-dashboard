import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/Login.vue'
import Store from './store/store'
import Dashboard from './views/Dashboard/Dashboard.vue';
import PaymentList from './views/PaymentList/Payment.vue'

Vue.use(Router);

const router = new Router({
    mode: 'history',
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
            path: '/payments',
            name: 'payments',
            component: PaymentList,
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
