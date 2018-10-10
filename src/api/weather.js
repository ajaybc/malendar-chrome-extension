import localforage from 'localforage';

import { WEATHER_URL } from '../constants/urls';

export const fetchWeather = (woeid) => {
  return new Promise(async (resolve, reject) => {
    const timestamp = Math.floor(Date.now() / 1000);
    let weatherJSON = await localforage.getItem('weather_' + woeid);
    if (weatherJSON) {
      if ((weatherJSON.fetchTime + 3600) > timestamp) {
        resolve(weatherJSON);
        return;
      } else {
        //console.log('Local weather is stale, need to fetch from live');
      }
    }

    try {
      weatherJSON = await fetch(WEATHER_URL + woeid).then((response) => response.json());
    } catch (e) {
      reject(e);
      return;
    }
    weatherJSON.fetchTime = timestamp;
    await localforage.setItem('weather_' + woeid, weatherJSON);
    resolve(weatherJSON);
  })
}