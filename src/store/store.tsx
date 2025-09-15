import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { DropdownsReducer } from '@/store/features/DropdownSlice';
import { StylesReducer } from '@/store/features/StylesSlice';
import { ElementsReducer } from '@/store/features/ElementsSlice';
import { UIReducer } from '@/store/features/UISlice';
import {
  elementsPersistConfig,
  stylesPersistConfig,
  uiPersistConfig,
  rootPersistConfig
} from './persistConfigs';

const persistedElementsReducer = persistReducer(elementsPersistConfig, ElementsReducer);
const persistedStylesReducer = persistReducer(stylesPersistConfig, StylesReducer);
const persistedUIReducer = persistReducer(uiPersistConfig, UIReducer);

const rootReducer = combineReducers({
  elementsState: persistedElementsReducer,
  styles: persistedStylesReducer,
  ui: persistedUIReducer,
  dropdown: DropdownsReducer,
});

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['register', '_persist'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

if (process.env.NODE_ENV === 'development') {
  store.subscribe(() => {
    const state = store.getState();
    if (state._persist && state._persist.rehydrated) {
      // console.log('Store rehydrated:', state);
    }
  });
};
