import { FETCHING_WEATHER, FETCHED_WEATHER } from '../constants/action-types';

import * as api from '../api/weather';

export function fetchWeather (woeid) {
  return dispatch => {
    dispatch(fetchingWeather());
    return api.fetchWeather(woeid).then(json => dispatch(fetchedWeather(json)))
  };
}

export function fetchingWeather(weather) {
  return {
    type: FETCHING_WEATHER
  }
}

export function fetchedWeather(weather) {
  return {
    type: FETCHED_WEATHER,
    weather
  }
}