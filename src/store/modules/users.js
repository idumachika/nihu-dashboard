const state = {
    USER: '',
    AUTH: '',
    IS_AUTHENTICATED: false,
};

const getters = {
    GET_USER: (state) => state.USER,
    GET_AUTH: (state) => state.AUTH,
    IS_AUTHENTICATED: (state) => state.IS_AUTHENTICATED
};

const mutations = {
    SET_USER: (state, user) => state.USER = user,
    SET_AUTH: (state, authentication) => {
        state.AUTH = authentication;
        state.IS_AUTHENTICATED = true;
    },
    REMOVE_AUTH: (state) => {
        state.AUTH = '';
        state.IS_AUTHENTICATED = false;
    },
};

const actions = {
    SAVE_USER: (context, username) => context.commit('SET_USER', username),
    SAVE_AUTH: (context, auth) => context.commit("SET_AUTH", auth),
    UNAUTHORISE: (context) => context.commit('REMOVE_AUTH')
};

export default {state, getters, mutations, actions}