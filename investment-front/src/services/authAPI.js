import fetchTemplate from "./fetchTemplate";


export const login = ({ username, password, rememberMe, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/auth/login`;
    const body = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: new URLSearchParams({ username, password, rememberMe }),
    };
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL, body });
}

export const logout = ({ onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/auth/logout`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}

export const register = ({ formData, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/auth/register`;
    const body = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    };
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL, body });
}

export const isLoggedIn = ({ onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/auth/is_logged_in`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}