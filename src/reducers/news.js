import { FETCH_NEWS, FETCHING_NEWS, FETCHED_NEWS } from '../constants/action-types'

const initialState = [
  // {
  //   text: 'Use Redux',
  //   completed: false,
  //   id: 0
  // }
]

export default function news(state = initialState, action) {
  switch (action.type) {
    // case FETCH_NEWS:
    //   return [];

    case FETCHED_NEWS:
      return action.news;

    default:
      return state
  }
}