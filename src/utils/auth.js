import { createFetchTemplate } from './constants';

const BASE_URL = 'https://api.news-storage-chest.students.nomoreparties.sbs';

export const register = (email, password, name) => {
    return createFetchTemplate(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    })
};

export const authorize = (email, password) => {
    return createFetchTemplate(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
};

export const checkContent = (token) => {
    return createFetchTemplate(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};