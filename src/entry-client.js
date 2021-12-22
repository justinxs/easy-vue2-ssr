import { createApp } from './app';

// 客户端特定引导逻辑……

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

window.THEME = window.STATIC_THEME = process.env.THEME;

// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve, 客户端跳转触发。

    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件

        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c));
        });

        if (!activated.length) {
            return next();
        }

        // 这里如果有加载指示器 (loading indicator)，就触发

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to });
            }
        })).then(() => {
            // 停止加载指示器(loading indicator)

            next();
        }).catch(next);
    });

    app.$mount('#app');
});

router.beforeEach((to, from, next) => {
    const seoMap = store.state.seoMap;
    const pageSeo = seoMap[to.path] || seoMap['/'];
    const whiteList = store.state.whiteList;
    const loginName = store.state.loginName;

    if (to.path !== '/login' && !loginName) {
        if (!whiteList.includes(to.path)) {
            return next(`/login?redirect=${to.fullPath}`);
        }
    } else if (to.path === '/login' && loginName) {
        return next('/');
    }

    next();

    app.$nextTick(() => {
        if (pageSeo) {
            Object.keys(pageSeo).forEach(key => {
                let meta;
                switch (key) {
                    case 'title':
                        document.title = pageSeo[key];
                        break;
                    case 'keywords':
                    case 'description':
                        meta = document.head.querySelector(`meta[name=${key}]`);
                        if (meta) {
                            meta.setAttribute('content', pageSeo[key]);
                        } else {
                            meta = document.createElement('meta');
                            meta.setAttribute('name', key);
                            meta.setAttribute('content', pageSeo[key]);
                            document.head.appendChild(meta);
                        }
                        break;
                    default:
                        break;
                }
            });
        }
    });
});