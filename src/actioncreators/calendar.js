import { FETCH_MONTH, FETCHING_MONTH, FETCHED_MONTH } from '../constants/action-types';
import * as api from '../api/calendar';

export function fetchMonth (year, month) {
  console.log('year month', year, month);
  return dispatch => {
    return api.fetchMonth(year, month).then(json => dispatch(fetchedMonth(json.news)))
  };
}

export function fetchedMonth(news) {
  return {
    type: FETCHED_MONTH,
    news
  }
}