import localforage from 'localforage';

import { NEWS_URL } from '../constants/urls';
import { NEWS_EXPIRY } from '../constants/config';

export const fetchNews = () => {
  return new Promise(async (resolve, reject) => {
    const timestamp = Math.floor(Date.now() / 1000);
    let newsJSON = await localforage.getItem('news_manorama');
    if (newsJSON) {
      console.log('Got data from local');
      if ((newsJSON.fetchTime + 3600) > timestamp) {
        console.log('Local news is fresh');
        resolve(newsJSON);
        return;
      } else {
        console.log('Local news is stale, need to fetch from live');
      }
    }
    newsJSON = await fetch(NEWS_URL).then((response) => response.json());
    newsJSON.fetchTime = timestamp;
    console.log('Got data from live', newsJSON);
    await localforage.setItem('news_manorama', newsJSON);
    resolve(newsJSON);
  })
}