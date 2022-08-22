import fetchTemplate from "./fetchTemplate";



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