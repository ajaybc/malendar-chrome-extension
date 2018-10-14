import { fetchApps, fetchingApps, fetchedApps } from '../apps';
import { FETCHING_APPS, FETCHED_APPS } from '../../constants/action-types';
import * as api from '../../api/apps';

describe('Apps action creator works as expected', () => {
  
  it('fetchApps fetches the list of apps', async () => {
    const dispatch = jest.fn();
    api.fetchApps = jest.fn(() => Promise.resolve([{'key':'value'}]));
    await fetchApps()(dispatch);
    expect(api.fetchApps).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).lastCalledWith(fetchedApps([{ 'key': 'value' }]));
  });

  it('fetchingApps returns the correct action', () => {
    expect(fetchingApps()).toEqual({
      type: FETCHING_APPS
    })
  });
  it('fetchedApps returns the correct action', () => {
    expect(fetchedApps([{ 'key': 'value' }])).toEqual({
      type: FETCHED_APPS,
      apps: [{ 'key': 'value' }]
    })
  })
});