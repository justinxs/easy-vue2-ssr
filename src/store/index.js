import Vue from 'vue';
import Vuex from 'vuex';
import foo from './modules/foo';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            testID: '',
            seoMap: {},
            whiteList: [],
            loginName: ''
        },
        actions: {
            test({ state }, id) {
                state.testID = id;
            }
        },
        mutations: {
            setLoginName(state, val) {
                state.loginName = val;
            },
            setSeoMap(state, data) {
                state.seoMap = data;
            },
            setWhiteList(state, data) {
                state.whiteList = data;
            }
        },
        modules: {
            foo
        }
    });
}