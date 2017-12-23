import localforage from 'localforage';

import { WEATHER_URL } from '../constants/urls';
import { WEATHER_EXPIRY } from '../constants/config';

export const fetchWeather = (woeid) => {
  return new Promise(async (resolve, reject) => {
    console.log('Fetching weather');
    const timestamp = Math.floor(Date.now() / 1000);
    let weatherJSON = await localforage.getItem('weather_' + woeid);
    //console.log(weatherJSON);
    if (weatherJSON) {
      console.log('Got data from local');
      if ((weatherJSON.fetchTime + 3600) > timestamp) {
        console.log('Local weather is fresh');
        console.log(weatherJSON);
        resolve(weatherJSON);
        return;
      } else {
        console.log('Local weather is stale, need to fetch from live');
      }
    }
    weatherJSON = await fetch(WEATHER_URL + woeid).then((response) => response.json());
    weatherJSON.fetchTime = timestamp;
    //console.log('Got data from live', weatherJSON);
    await localforage.setItem('weather_' + woeid, weatherJSON);
    resolve(weatherJSON);
  })
}