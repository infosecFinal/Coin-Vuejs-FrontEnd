const state = {
    login_id:'',
    login:'Login',
    register:'Register',
    isLogin: false
};

const mutations = {
    setId: ($state, $payload) => {
        $state.login_id=$payload;
        console.log("id: ",$state.login_id)
    },
    setLogout: ($state, $payload) => {
        $state.login=$payload;
    },
    setMypage: ($state, $payload) => {
        $state.register=$payload;
    },
    setLoginState: ($state, chk) => {
        $state.isLogin = chk
    }
};

const getters = {
    getLoginState: state => state.isLogin,
    getLogout: state => state.login,
    getMypage: state => state.register,
    getLoginId: state => state.login_id
}

export default{
    namespaced: true,
    state,
    mutations,
    getters
}