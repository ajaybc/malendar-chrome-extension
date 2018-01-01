import { combineReducers } from 'redux';

import apps from './apps';
import news from './news';
import month from './month';
import settings from './settings';
import weather from './weather';

//console.log('weather', weather);

const rootReducer = combineReducers({
  apps,
  news,
  month,
  settings,
  weather,
})

export default rootReducer
