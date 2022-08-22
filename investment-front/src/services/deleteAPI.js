import fetchTemplate from "./fetchTemplate";



export const deleteFd = ({ id, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/delete/${id}`;
    const body = { method: 'DELETE' };
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL, body });
}