import { FETCHING_APPS, FETCHED_APPS } from '../constants/action-types';

import * as api from '../api/apps';

export function fetchApps (woeid) {
  return dispatch => {
    dispatch(fetchingApps());
    return api.fetchApps(woeid).then(json => dispatch(fetchedApps(json)))
  };
}

export function fetchingApps(apps) {
  return {
    type: FETCHING_APPS
  }
}

export function fetchedApps(apps) {
  return {
    type: FETCHED_APPS,
    apps
  }
}