import { FETCHED_MONTH } from '../constants/action-types'

const initialState = [
  // {
  //   text: 'Use Redux',
  //   completed: false,
  //   id: 0
  // }
]

export default function month(state = initialState, action) {
  switch (action.type) {
    case FETCHED_MONTH:
      return action.month;

    default:
      return state
  }
}