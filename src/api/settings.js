import localforage from 'localforage';

import { NEWS_URL } from '../constants/urls';
import { NEWS_EXPIRY } from '../constants/config';

const defaultSettings = {
  'weatherCity': 'kochi',
}

export const loadSettings = () => {
  return new Promise(async (resolve, reject) => {
    let settingsJSON = await localforage.getItem('settings');
    if (settingsJSON) {
      resolve(settingsJSON);
    } else {
      resolve(defaultSettings);
    }
  })
}

export const saveSettings = (settings) => {
  return new Promise(async (resolve, reject) => {
    localforage.setItem('settings', settings).then(() => {
      resolve(settings);
    })
  })
}