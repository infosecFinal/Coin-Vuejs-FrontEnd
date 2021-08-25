import axios from "axios";

const baseURL = "http://weakapi.5nlytoday.com";

export const insertFile = (data, board_id, user_id, pageType) => {
    console.log("insertFIle: ", data, board_id, user_id);
    console.log(`${baseURL}/file/upload?board_id=${board_id}&user_id=${user_id}&pageType=${pageType}`);
    return axios.post(`${baseURL}/file/upload?board_id=${board_id}&user_id=${user_id}&pageType=${pageType}`, data);
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