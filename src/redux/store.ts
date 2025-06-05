import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, type PersistedState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slice/userSlice';
import profileReducer from './slice/profileSlice';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  // Add other reducers here as needed
});

// Persist configuration
const persistConfig = {
  key: 'vault_root',
  storage,
  whitelist: ['user'], // Only persist user slice
  blacklist: [], // Don't persist these slices
  version: 1,
  migrate: (state: unknown): Promise<PersistedState> => {
    // Handle migration between versions if needed
    return Promise.resolve(state as PersistedState);
  }
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
