import { createFetchTemplate } from './constants';

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getSavedArticles() {
        return createFetchTemplate(`${this._baseUrl}/articles`, { headers: this._headers })
    };

    getUserInfo() {
        return createFetchTemplate(`${this._baseUrl}/users/me`, { headers: this._headers })
    };

    saveNewArticle(articleData) {
        return createFetchTemplate(`${this._baseUrl}/articles`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(articleData)
        })
    }

    deleteArticle(articleId) {
        return createFetchTemplate(`${this._baseUrl}/articles/${articleId}`, {
            headers: this._headers,
            method: "DELETE"
        })
    }
}

const mainApi = new Api({
    baseUrl: 'https://api.news-storage-chest.students.nomoreparties.sbs',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

export default mainApi;



