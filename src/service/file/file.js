import axios from "axios";

const baseURL = "http://localhost:8084";

export const insertFile = (data, board_id, user_id) => {
    console.log("insertFIle: ", data, board_id, user_id);
    return axios.post(`${baseURL}/file/upload?board_id=${board_id}&user_id=${user_id}`, data);
}

export const getFilesInfo = (board_id) => {
    return axios.get(`${baseURL}/file/list/${board_id}`);
}

export const getFile = (id) => {
    return axios.get(`${baseURL}/file/download/${id}`, {
        headers: { responseType: 'arraybuffer' }
    })
}

export const deleteFile = (file_id) => {
    return axios.post(`${baseURL}/file/delete`, file_id)
}