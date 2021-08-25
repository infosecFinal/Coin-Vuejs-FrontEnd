import axios from 'axios';

axios.defaults.withCredentials = true;

const baseURL = 'http://weakapi.5nlytoday.com';

export const fetchData = (pageType) => {
    return axios.get(`${baseURL}/board/lists?pageType=${pageType}`);
}

export const fetchDataById = (id) => {
    return axios.get(`${baseURL}/board/list/${id}`)
}

export const insertData = (data) => {
    return axios.post(`${baseURL}/board/insert`, data);
}

export const updateData = (data) => {
    return axios.post(`${baseURL}/board/update`, data)
}

export const deleteData = (id) => {
    return axios.post(`${baseURL}/board/delete`, {
        id: id
    })
}

export const findData = (category, to_find, pageType) => {
    return axios.get(`${baseURL}/board/find?category=${category}&content=${to_find}&pageType=${pageType}`)
}

export const insertUser = (data) => {
    return axios.post(`${baseURL}/account/register`, data)
}

export const checkUser = (data) => {
    return axios.get(`${baseURL}/account/login?login_id=${data.login_id}&login_pw=${data.login_pw}`)
}

export const getUserIDList = (data) => {
    return axios.post(`${baseURL}/account/validation`, data)
}

export const deleteUser = (data) => {
    return axios.post(`${baseURL}/account/delete`, data)
}

export const getUserInfo = () => {
    return axios.get(`${baseURL}/account/print`)
}

export const updateUser = (data) => {
    return axios.post(`${baseURL}/account/mypage/update`, data)
}

export const uploadImage = (data) => {
    console.log("uploadImage() : " + data);
    return axios.post(`${baseURL}/account/mypage/update/upload`, data)
}

export const updatePw = (data) => {
    return axios.post(`${baseURL}/account/findpw`, data)
}

export const getBtcList = () => {
    return axios.get(`${baseURL}/home/chart`)
}

export const findAddressList = (user_dong) => {
    console.log(user_dong)
    return axios.get(`${baseURL}/account/findaddress?user_dong=${user_dong}`)
}

export const findBtcByDate = (datetime) => {
    return axios.get(`${baseURL}/chaert?datetime=${datetime}`)
}