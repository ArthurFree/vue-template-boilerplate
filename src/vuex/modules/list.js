/* eslint-disable no-param-reassign */
// modules list

import {
    GET_LIST,
} from '../mutation-types';

// initial state
const state = {
    allList: [],
};

// getters
const getters = {
    /* eslint no-shadow: 'off' */
    allInfoLists: state => state.allList,
};

// actions
const actions = {
    getAllList({ commit }) {
        const data = [
            {
                id: 1,
                name: 'john',
                age: 16,
            }, {
                id: 2,
                name: 'john',
                age: 16,
            }, {
                id: 3,
                name: 'john',
                age: 16,
            },
        ];
        commit(GET_LIST, { data });
    },
};

// mutaions
const mutations = {
    [GET_LIST](state, { data }) {
        state.allList = data;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
