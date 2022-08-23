import fetchTemplate from "./fetchTemplate";




export const getAdditions = ({ page, id, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/get/additions/${id}?page=${page}`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}

export const getInterestAmount = ({ principalAmount, interestRate, period, onInit, onSuccess, onFailure, onFinal })=> {
    const URL = `http://localhost:8080/service/calculate_interest?principal_amount=${principalAmount}&interest_rate=${interestRate}&period=${period}`;
    fetchTemplate({ onInit, onSuccess, onFailure, onFinal, url: URL });
}

export const getListView = ({ page, pageSize, status, fdName, registrantName, onInit, onSuccess, onFailure, onFinal })=> {
    let URL = `http://localhost:8080/get/list_view?`;
    if (page) URL += `&page=${page}`;
    if (pageSize) URL += `&page_size=${pageSize}`;
    if (status) URL += `&status=${status}`;
    if (fdName) URL += `&fd_name=${fdName}`;
    if (registrantName) URL += `&registrant_name=${registrantName}`;
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