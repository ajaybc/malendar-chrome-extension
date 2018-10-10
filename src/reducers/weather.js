import { FETCHING_WEATHER, FETCHED_WEATHER } from '../constants/action-types';
import { LOADING, SUCCESS } from '../constants/loading-status';

const initialState = {
  data : {
    condition: null,
    forecast: null,
  }
}

export default function weather(state = initialState, action) {
  switch (action.type) {
    case FETCHING_WEATHER:
      return { data: {}, status: LOADING };
    case FETCHED_WEATHER:
      return { data: action.weather, status: SUCCESS };

    default:
      return state
  }
}