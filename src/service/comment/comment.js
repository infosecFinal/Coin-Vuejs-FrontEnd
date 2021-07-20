import axios from 'axios';

axios.defaults.withCredentials=true;
const baseURL = 'http://localhost:8083';

export const insertComment = (data) => {
    return axios.post(`${baseURL}/comment/insert`, data);
}

export const fetchComment = (data) => {
    return axios.get(`${baseURL}/comment/lists/${data}`);
}