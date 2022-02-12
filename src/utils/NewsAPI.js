import { createFetchTemplate, getWeekAgoDate } from '../utils/constants';

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getArticles(keyword) {
        return createFetchTemplate(`${this._baseUrl}?q=${keyword}&from=${getWeekAgoDate(new Date())}&pageSize=100&apiKey=a34865bd3d95434c9b561318cc7a5cde`);
    };
}

const newsApi = new Api({
    baseUrl: 'https://nomoreparties.co/news/v2/everything'
    // baseUrl: 'https://newsapi.org/v2/everything'
})


export default newsApi;
