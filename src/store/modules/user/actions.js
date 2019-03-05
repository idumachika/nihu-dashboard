import {userService} from "../../../services/user.service";

const actions = {
    SAVE_USER: (context, username) => context.commit('SET_USER', username),
    SAVE_AUTH: (context, auth) => context.commit("SET_AUTH", auth),
    UNAUTHORISE_USER: (context) => context.commit('REMOVE_AUTH'),
    isLoggedIn(context) {
        // Fetch the User token
        let token = context.getters.GET_AUTH_TOKEN;
        if (token.length === 0) return false;
        return context.dispatch('AUTHORISE_USER', token);
    },
    LOGIN: async (context, {username, password}) => {
        return userService.login({username: username, password: password}).then(async (token) => {
            // Store the User Token
            context.commit('SET_AUTH_TOKEN', token);
            let authorize = await context.dispatch('AUTHORISE_USER', token);
            return Promise.resolve(authorize);
        }).catch((error) => {
            return Promise.reject(error);
        });
    },
    AUTHORISE_USER: async (context, token) => {
        return userService.authorize(token).then((res) => {
            context.commit('SET_USER_DATA', res.data.data);
            return true;
        }).catch(() => false);
    }
};

export {actions};