import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
// import * as getters from './getters';
import list from './modules/list';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export function createStore() {
    return new Vuex.Store({
        // actions,
        // getters,
        modules: {
            list,
        },
        strict: debug,
        plugins: [],
    });
}
