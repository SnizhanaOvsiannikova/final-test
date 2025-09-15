import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';

export const elementsPersistConfig = {
  key: 'elements',
  storage: storage,
};

export const stylesPersistConfig = {
  key: 'styles',
  storage: storage,
};

export const uiPersistConfig = {
  key: 'ui',
  storage: sessionStorage,
  whitelist: ['selectedElementId'],
};

export const rootPersistConfig = {
  key: 'oliver-pos-root',
  storage: storage,
  version: 1,
  whitelist: ['elements', 'styles'],
};