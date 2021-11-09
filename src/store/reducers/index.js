import { combineReducers } from 'redux';
import user from './user';
import fabric from './fabric';

export default combineReducers({
  user,
  fabric,
});
