import * as type from '../types';

const initialState = {
  units: [],
  loading: false,
  error: null,
}

export default function units(state = initialState, action) {
  switch (action.type) {
    case type.GET_UNITS_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case type.GET_UNITS_SUCCESS:
      return {
        ...state,
        loading: false,
        units: action.units
      }
    case type.GET_UNITS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}