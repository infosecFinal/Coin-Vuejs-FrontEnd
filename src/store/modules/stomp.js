const state = {
    msgs: []
};

const mutations = {
    pushMsg: ($state, $payload) => {
        $state.msgs.push($payload);
    }
};

export default{
    namespaced: true,
    state,
    mutations
}