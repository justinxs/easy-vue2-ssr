import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: () => import('../views/Home.vue')
            },
            {
                path: '/login',
                component: () => import('../views/Login.vue')
            },
            {
                path: '/foo',
                component: () => import('../views/Foo.vue')
            },
            {
                path: '/parent',
                component: () => import('../views/parent/index.vue'),
                children: [
                    {
                        path: 'child',
                        component: () => import('../views/parent/child.vue')
                    }
                ]
            }
        ]
    });
}