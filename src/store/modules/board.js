import axios from 'axios';

const state = {
    writelist: []
};

const actions = {
    fetchData: ({state}) => {
        const baseURL = "http://localhost:3333";
        axios.get(`${baseURL}/board/lists`)
            .then((result) => {
                state.writelist = result.data.list;
            });
    }
}

export default{
    namespaced: true,
    state, 
    actions
}