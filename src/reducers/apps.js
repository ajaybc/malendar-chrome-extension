import { FETCH_APPS, FETCHING_APPS, FETCHED_APPS, FETCH_FAILED_APPS } from '../constants/action-types';
import { LOADING, SUCCESS, ERROR } from '../constants/loading-status';

const initialState = {
  data : []
}

export default function apps(state = initialState, action) {
  switch (action.type) {
    case FETCHING_APPS:
      return { data: [], status: LOADING };
    case FETCHED_APPS:
      //console.log('action', action);
      return { data: action.apps, status: SUCCESS };

    default:
      return state
  }
}