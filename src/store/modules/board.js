import axios from 'axios';

const baseURL = "http://localhost:8083";

const state = {
    writelist: []
};
const actions = {
    fetchData: ({state}) => {
        axios.get(`${baseURL}/board/lists`)
            .then((result) => {
                console.log("result len: ", result.data.list.length)
                state.writelist = result.data.list;
                console.log("list: "+state.writelist.length);
            });
    },

}

export default{
    namespaced: true,
    state, 
    actions
}