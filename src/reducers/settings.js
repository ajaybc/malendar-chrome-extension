import { LOADED_SETTINGS, SAVED_SETTINGS } from '../constants/action-types'

const initialState = {
  weatherCity: null
}

// const ls = window.localStorage;

export default function view(state = initialState, action) {
  switch (action.type) {
    case LOADED_SETTINGS:
      return action.settings;

    case SAVED_SETTINGS:
      return {...state, ...action.settings};

    default:
      return state;
  }
}