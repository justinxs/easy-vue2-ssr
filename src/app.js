import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';
import '@/styles/index.scss';
import { Icon, Toast, Popup, Dialog } from 'vant';

Vue.use(Icon);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Dialog);

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
    const router = createRouter();
    const store = createStore();

    // 同步路由状态(route state)到 store
    sync(store, router);

    const app = new Vue({
        router,
        store,
        // 根实例简单的渲染应用程序组件。
        render: h => h(App)
    });
    return { app, router, store };
}