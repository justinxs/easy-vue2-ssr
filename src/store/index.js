import Vue from 'vue';
import Vuex from 'vuex';
import foo from './modules/foo';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            testID: ''
        },
        actions: {
            test({ state }, id) {
                state.testID = id;
            }
        },
        mutations: {
            
        },
        modules: {
            foo
        }
    });
}