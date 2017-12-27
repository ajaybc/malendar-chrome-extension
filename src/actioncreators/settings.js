import { LOAD_SETTINGS, LOADED_SETTINGS, SAVED_SETTINGS, SWITCH_WEATHER_CITY } from '../constants/action-types';
import * as api from '../api/settings';


export function switchWeatherCity (city) {
  return {
    type: SWITCH_WEATHER_CITY,
    city
  }
}

export function loadedSettings(settings) {
  return {
    type: LOADED_SETTINGS,
    settings
  }
}

export function savedSettings(settings) {
  return {
    type: SAVED_SETTINGS,
    settings
  }
}

export function loadSettings() {
  return dispatch => {
    return api.loadSettings().then(settings => dispatch(loadedSettings(settings)))
  };
}

export function saveSettings(settings) {
  return dispatch => {
    return api.saveSettings(settings).then(s => dispatch(savedSettings(s)))
  };
}