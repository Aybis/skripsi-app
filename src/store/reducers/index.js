import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from './user';
import fabric from './fabric';
import bridge from './vxlan';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['fabric'],
};

const rootReducer = combineReducers({
  user,
  fabric,
  bridge,
});

export default persistReducer(persistConfig, rootReducer);
