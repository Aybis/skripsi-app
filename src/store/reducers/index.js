import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from './user';
import fabric from './fabric';
import bridge from './bridge';
import ibgp from './ibgp';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['fabric', 'user', 'bridge', 'ibgp'],
};

const rootReducer = combineReducers({
  user,
  fabric,
  ibgp,
  bridge,
});

export default persistReducer(persistConfig, rootReducer);
