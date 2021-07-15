const state = {
    login_id:'',
    page:'Login',
    isLogin: false
};

const mutations = {
    setId: ($state, $payload) => {
        $state.login_id=$payload;
        console.log("id: ",$state.login_id)
    },
    setPage: ($state, $payload) => {
        $state.page=$payload;
    },
    setLoginState: ($state, chk) => {
        $state.isLogin = chk
    }
};

const getters = {
    getLoginState: state => state.isLogin,
    getPage: state => state.page,
    getLoginId: state => state.login_id
}

export default{
    namespaced: true,
    state,
    mutations,
    getters
}