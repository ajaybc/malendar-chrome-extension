import { FETCHED_NEWS } from '../constants/action-types';
// import { NEWS_URL } from '../constants/urls';
import * as api from '../api/news';

export function fetchNews () {
  return dispatch => {
    return api.fetchNews().then(json => dispatch(fetchedNews(json.news)))
  };
}

export function fetchedNews(news) {
  return {
    type: FETCHED_NEWS,
    news
  }
}