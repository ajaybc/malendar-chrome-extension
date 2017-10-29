import { combineReducers } from 'redux';

import news from './news';
import month from './month';
import settings from './settings';

const rootReducer = combineReducers({
  news,
  month,
  settings,
})

export default rootReducer
