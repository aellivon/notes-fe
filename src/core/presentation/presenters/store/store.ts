import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer'
import appUIReducer from './reducers/appState.reducer'
import usersReducer from './reducers/users.reducer';
import groupsReducer from './reducers/groups.reducer';
import formUserProfileReducer from './reducers/formUserProfile.reducer';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { encryptTransform } from 'redux-persist-transform-encrypt';
import { useStore } from 'react-redux';
import knowledgebaseReducer from './reducers/knowledgebase.reducer';

const encryptor = encryptTransform({
  secretKey: 'my-super-secret-key',
  onError: function (error) {
    // Handle the error.
  },
})


const reducer = combineReducers({
  formUserProfileState: formUserProfileReducer,
  authState: authReducer,
  appUIState: appUIReducer,
  usersState: usersReducer,
  kbState: knowledgebaseReducer,
  groupState: groupsReducer
});


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['documentsState', 'appState'],
  transforms: [encryptor],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type AppDispatch = typeof store.dispatch;
export type AppUseStoreType = typeof store
export type RootState = ReturnType<typeof reducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
