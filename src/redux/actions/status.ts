import { Action } from '../../interfaces/actions';
import {
  CLEAR_FAILURE,
  SET_FAILURE,
  SET_LOADING,
  SET_ACTIVE,
} from '../reducers/status';

/**
 * Setea la configuracion del Loading/Carga
 * @param key clave de la actividad
 * @param status estado de la actividad
 */
export const setLoading = (key?: string, status?: boolean): Action => ({
  type: SET_LOADING,
  payload: {
    key,
    status,
  },
});

/**
 * Setea un error
 * @param title Titulo del error
 * @param message Mensaje del error
 */
export const setFailure = (title?: string, message?: string): Action => ({
  type: SET_FAILURE,
  payload: {
    title,
    message,
  },
});

/**
 * Limpia el error actual
 */
export const clearFailure = (): Action => ({
  type: CLEAR_FAILURE,
});

/**
 * Setea la configuracion del Loading/Carga
 * @param active estado de la actividad
 */
export const setActive = (active?: boolean): Action => ({
  type: SET_ACTIVE,
  payload: {
    active,
  },
});
