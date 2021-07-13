const state = {
    login_id:'',
    page:'Login'
};

const mutations = {
    setId: ($state, $payload) => {
        $state.login_id=$payload;
        console.log("id: ",$state.login_id)
    },
    setPage: ($state, $payload) => {
        $state.page=$payload;
    }
};

const getters = {
    getLoginState: state => state.login_id,
    getPage: state => state.page
}

export default{
    namespaced: true,
    state,
    mutations,
    getters
}