import { FETCH_NEWS, FETCHING_NEWS, FETCHED_NEWS } from '../constants/action-types';
import { NEWS_URL } from '../constants/urls';

export function fetchNews () {
  return dispatch => {
    return fetch(NEWS_URL)
      .then(response => response.json())
      .then(json => dispatch(fetchedNews(json.news)))
  };
}

export function fetchedNews(news) {
  return {
    type: FETCHED_NEWS,
    news
  }
}