const state = {
    login_id:'',
    user_image:'',
    login:'Login',
    register:'Register',
    isLogin: false,
    isAdmin: false
};

const mutations = {
    setId: ($state, $payload) => {
        $state.login_id = $payload,
        console.log("id: ",$state.login_id)
    },
    setLogout: ($state, $payload) => {
        $state.login = $payload
    },
    setMypage: ($state, $payload) => {
        $state.register = $payload
    },
    setLoginState: ($state, chk) => {
        $state.isLogin = chk
    },
    setImgaePath: ($state, $payload) =>{
        $state.user_image = $payload
    },
    setAdmin: ($state, $payload) => {
        $state.isAdmin = $payload;
    }
};

const getters = {
    getLoginState: state => state.isLogin,
    getLogout: state => state.login,
    getMypage: state => state.register,
    getLoginId: state => state.login_id,
    getImagePath: state => state.user_image,
    getisAdmin: state => state.isAdmin
}

export default{
    namespaced: true,
    state,
    mutations,
    getters
}