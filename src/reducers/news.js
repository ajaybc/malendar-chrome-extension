import { FETCHED_NEWS } from '../constants/action-types'

const initialState = [
]

export default function news(state = initialState, action) {
  switch (action.type) {
    case FETCHED_NEWS:
      return action.news;

    default:
      return state
  }
}