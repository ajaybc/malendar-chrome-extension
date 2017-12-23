import { combineReducers } from 'redux';

import news from './news';
import month from './month';
import settings from './settings';
import weather from './weather';

//console.log('weather', weather);

const rootReducer = combineReducers({
  news,
  month,
  settings,
  weather,
})

export default rootReducer
