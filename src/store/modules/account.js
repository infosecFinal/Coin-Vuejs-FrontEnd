const state = {
    login_id:''
};

const mutations = {
    setId: ($state, $payload) => {
        $state.login_id=$payload;
    }
};

const getters = {
    getLoginState: state => state.login_id
}

export default{
    namespaced: true,
    state,
    mutations,
    getters
}