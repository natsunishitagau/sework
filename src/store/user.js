const key = 'user'
const user = {
    state() {
        return {
            user: "",
            isLogin:false
        }
    },
    getters: {
        getUser: state=>state.user,
        isLogin: state=>state.isLogin
    },
    mutations: {
        userStorage (state, value) {
            state.user = value
            state.isLogin = true
            localStorage.setItem(key, JSON.stringify(value))
        },
        removeStorage (state) {
            state.user = null
            state.isLogin = false
            localStorage.removeItem(key)
        },

    },
    actions: {
        saveUserInfo({ commit }, data) {
            commit('userStorage', data)
        },
        clearUserInfo({ commit }) {
            commit('removeStorage');
        },
    }
};

export default user
