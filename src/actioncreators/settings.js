import { SWITCH_VIEW_MODE } from '../constants/action-types';
// import * as api from '../api/calendar';

export function switchView (viewMode) {
  return {
    type: SWITCH_VIEW_MODE,
    viewMode
  }
}