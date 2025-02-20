import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Reducers
import authorization from './reducers/authorization';
import balance from './reducers/balance';
import status from './reducers/status';

/**
 * Configuracion para la persistencia de redux
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authorization', 'balance'], // Solamente estos reducers seran persistidos
};

/**
 * Combina todos los reducers
 */
const rootReducer = combineReducers({
  authorization,
  balance,
  status,
});

/**
 * Aplica la configuracion de persistencia a los reducers de Redux
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/** Store de Redux */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

/** Persistencia de Redux */
export const persistor = persistStore(store);

/**
 * Tipado del Store
 */
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
