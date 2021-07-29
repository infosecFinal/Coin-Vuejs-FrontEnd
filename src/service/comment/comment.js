import axios from 'axios';

axios.defaults.withCredentials = true;
const baseURL = 'http://192.168.0.2:8083';

export const insertComment = (data) => {
    return axios.post(`${baseURL}/comment/insert`, data);
}

export const fetchComment = (data) => {
    return axios.get(`${baseURL}/comment/lists/${data}`);
}

export const deleteComment = (data) => {
    return axios.post(`${baseURL}/comment/delete`, data);
}