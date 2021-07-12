import axios from 'axios';

const baseURL = "http://localhost:8083";

const state = {
    writelist: [],
    post: {}
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
    fetchDataById: ({state}, payload) => {
        axios.get(`${baseURL}/board/${payload}`)
            .then((result) => {
                state.post = result.data.data;
                console.log("data:", state.post);    
            })
    }


}

export default{
    namespaced: true,
    state, 
    actions
}