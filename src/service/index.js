import axios from 'axios';

const baseURL = 'http://localhost:8083';

export const fetchData = () => {
    return axios.get(`${baseURL}/board/lists`);
}

export const fetchDataById = (id) => {
    return axios.get(`${baseURL}/board/list/${id}`)
}

export const insertData = (data) => {
    console.log(data);
    return axios.post(`${baseURL}/board/insert`, data)
}

export const updateData = (data) => {
    return axios.post(`${baseURL}/board/update`, data)
}

export const deleteData = (id) => {
    return axios.post(`${baseURL}/board/delete`,{
        id: id
<<<<<<< HEAD
    })
}

export const findData = (category, to_find) => {
    return axios.get(`${baseURL}/board/find?category=${category}&content=${to_find}`);
=======
    })   
}

export const insertUser = (data) => {
    console.log(data);
    return axios.post(`${baseURL}/account/register`, data)
>>>>>>> 75e18ed521c73d93b53d98d3bb3ace62527f2497
}