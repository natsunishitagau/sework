const key = 'user'
const user = {
    state() {
        return {
            user: "",
            isLogin: false,
            src: ""
        }
    },
    getters: {
        getUser: state=>state.user,
        isLogin: state=>state.isLogin,
        src: state=>state.src
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
            state.src= null
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
