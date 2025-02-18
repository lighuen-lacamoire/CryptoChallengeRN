//import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { persistStore, persistReducer } from 'redux-persist';
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// Reducers
import authorization from './reducers/authorization';
import status from './reducers/status';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 * Configuracion para la persistencia de redux
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authorization'], // Solamente estos reducers seran persistidos
};

/**
 * Combina todos los reducers
 */
const rootReducer = combineReducers({
  authorization,
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
  //middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});
//export const store = createStore(persistedReducer, applyMiddleware(thunk));

/** Persistencia de Redux */
export const persistor = persistStore(store);

/**
 * Type del Store
 */
export type RootState = ReturnType<typeof rootReducer>;
//NEWs
//export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
