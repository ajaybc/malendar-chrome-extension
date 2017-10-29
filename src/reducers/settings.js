import { SWITCH_VIEW_MODE } from '../constants/action-types'

const initialState = {
  viewMode: 'day',
}

const ls = window.localStorage;

export default function view(state = initialState, action) {
  switch (action.type) {
    case SWITCH_VIEW_MODE:
      ls.setItem('VIEW_MODE', action.viewMode);
      return { ...state, viewMode: action.viewMode };

    default:
      return state
  }
}