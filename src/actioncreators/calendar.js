import { FETCHED_MONTH } from '../constants/action-types';
import * as api from '../api/calendar';

export function fetchMonth (year, month) {
  return dispatch => {
    return api.fetchMonth(year, month).then(month => dispatch(fetchedMonth(month.days)))
  };
}

export function fetchedMonth(month) {
  return {
    type: FETCHED_MONTH,
    month
  }
}