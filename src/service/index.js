import axios from 'axios';

const baseURL = 'http://localhost:8083';

export const fetchData = () => {
    return axios.get(`${baseURL}/board/lists`);
}

export const fetchDataById = (id) => {
    return axios.get(`${baseURL}/board/list/${id}`)
}

export const insertData = (data) => {
    return axios.post(`${baseURL}/board/insert`, data);
}

export const insertFile = (data, board_id) => {
    return axios.post(`${baseURL}/file/upload?board_id=${board_id}`, data);
}


export const updateData = (data) => {
    return axios.post(`${baseURL}/board/update`, data)
}

export const deleteData = (id) => {
    return axios.post(`${baseURL}/board/delete`,{
        id: id
    })
}


export const findData = (category, to_find) => {
    return axios.get(`${baseURL}/board/find?category=${category}&content=${to_find}`);   
}

export const insertUser = (data) => {
    console.log(data);
    return axios.post(`${baseURL}/account/register`, data)
}

export const checkUser = (data) => {
    console.log(data);
    return axios.post(`${baseURL}/account/login`, data)

}

export const getUserIDList = (data) => {
    console.log(data);
    return axios.post(`${baseURL}/account/validation`, data)

}

export const deleteUser = (data) => {
    console.log(data);
    return axios.post(`${baseURL}/account/delete`, data)

}