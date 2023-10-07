import { combineReducers } from 'redux';
import units from './units';

const rootReducer = combineReducers({
  units: units,
});

export default rootReducer;