import { FETCH_WEATHER, FETCHING_WEATHER, FETCHED_WEATHER } from '../constants/action-types'

const initialState = {
  condition: null,
  forecast: null,
}

export default function weather(state = initialState, action) {
  switch (action.type) {
    case FETCHED_WEATHER:
      console.log('action', action);
      return action.weather;

    default:
      return state
  }
}