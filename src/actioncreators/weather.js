import { FETCH_WEATHER, FETCHING_WEATHER, FETCHED_WEATHER } from '../constants/action-types';

import * as api from '../api/weather';

export function fetchWeather (woeid) {
  return dispatch => {
    return api.fetchWeather(woeid).then(json => dispatch(fetchedWeather(json)))
  };
}

export function fetchedWeather(weather) {
  return {
    type: FETCHED_WEATHER,
    weather
  }
}