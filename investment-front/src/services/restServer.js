
// The template that will be used for all API fetching methods
async function fetchTemplate({
    onInit = () => {},
    onSuccess = () => {}, 
    onFailure = () => {}, 
    onFinal = () => {},
    url,
    body = undefined
}) {
    onInit();
    try {
        const res = await fetch(url, {
            ...body,
            credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) throw data;
        onSuccess(data);
    } 
    catch (e) { onFailure(e); }
    finally { onFinal(); }
}

//==========================
//  GET
//==========================
export const getAdditions = ({ page, id, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/get/additions/${id}?page=${page}`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}

export const getInterestAmount = ({ principalAmount, interestRate, period, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/service/calculate_interest?principal_amount=${principalAmount}&interest_rate=${interestRate}&period=${period}`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}

export const getListView = ({ page, pageSize, status, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/get/list_view?page=${page}&page_size=${pageSize}&status=${status}`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}

export const getSchedules = ({ page, pageSize, id, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/get/schedule_view/${id}?page=${page}&page_size=${pageSize}`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}

export const getUpsertView = ({ id, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/get/upsert_view/${id}`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}

export const getWithdrawals = ({ page, id, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/get/withdrawals/${id}?page=${page}`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}

//==========================
//  POST
//==========================
export const postAcceptReject = ({ id, mode, onInit, onSuccess, onFailure, onFinal })=> {
    const ACCEPT_DATA_URL = 'http://localhost:8080/upsert/approve';
    const REJECT_DATA_URL = 'http://localhost:8080/upsert/reject';
    const URL = (mode === 'APPROVE')? `${ACCEPT_DATA_URL}/${id}`: `${REJECT_DATA_URL}/${id}`;
    const body = { method: 'POST' };
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL, body });
}

export const postAddition = ({ fixedDepositId, amount, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/upsert/addition/`;
    const body = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fixedDepositId, amount,
        }),
    };
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL, body });
}

export const postWithdrawal = ({ fixedDepositId, amount, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/upsert/withdrawal/`;
    const body = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fixedDepositId, amount,
        }),
    };
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL, body });
}

export const postUpsert = ({ formData, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/upsert/`;
    const body = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    };
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL, body });
}


//==========================
//  DELETE
//==========================
export const deleteFd = ({ id, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/delete/${id}`;
    const body = { method: 'DELETE' };
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL, body });
}


//==========================
//  AUTH
//==========================
export const login = ({ username, password, rememberMe, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/auth/login`;
    const body = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username, password, rememberMe
        }),
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