import { createFetchTemplate } from '../utils/constants';

class Api {
    constructor(baseUrl, token, keyword, fromDate, pageSize) {
        this._baseUrl = baseUrl;
        this._token = token;
        this._keyword = keyword;
        this._fromDate = fromDate;
        this._pageSize = pageSize;
    }

    _getWeekAgoDate = (today) => {
        const lastweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        return this._fromDate = lastweek.toISOString().split('T')[0];
    }

    getArticles(keyword) {
        return createFetchTemplate(`https://newsapi.org/v2/everything?q=${keyword}&from=2022-01-20&pageSize=10&apiKey=a34865bd3d95434c9b561318cc7a5cde`);
    };
}

// const newsApi = new Api({
//     baseUrl: 'https://newsapi.org/v2/everything',
//     token: 'a34865bd3d95434c9b561318cc7a5cde',
//     pageSize: 100,
// })

const newsApi = new Api()


export default newsApi;
