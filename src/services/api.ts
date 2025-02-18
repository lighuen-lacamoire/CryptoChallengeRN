import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import {
  AppError,
  Header,
  HttpResponse,
  OAuthUrlProps,
} from '../interfaces/services';
import { deleteItem, getItem } from '../tools/storage';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutExecute } from '../redux/actions/authorization';
import { store } from '../redux/store';

/**
 * Manejador de error
 * @param {unknown} error Error desconocido del llamado http con axios
 * @returns {AppError} error configurado para la app
 */
export const handleError = (error: unknown): AppError => {
  const erMessage = 'Ha ocurrido un error';
  const erCode = 500;
  const erStatus = 500;
  const erTitle = 'Error';

  const errorAxios = error as AxiosError;
  if (errorAxios) {
    return {
      title: erTitle,
      message: errorAxios.message,
      code: parseInt(errorAxios.code ?? '400', 10),
      status: errorAxios.status,
    };
  }

  const errorHttp = error as HttpResponse;
  if (errorHttp && errorHttp.code) {
    console.log('HttpResponse', errorHttp);
    return {
      title: erTitle,
      message: errorHttp.message,
      code: errorHttp.code,
      status: errorHttp.status,
    };
  }

  const errorGeneric = error as Error;
  if (errorGeneric && errorGeneric.message) {
    console.log('http Error', errorGeneric);
    if (errorGeneric.message === 'NETWORK_ERROR') {
      Alert.alert('Error de Conexion');
    }
    return {
      title: errorGeneric.name,
      message: errorGeneric.message,
      status: 400,
      code: 400,
    };
  }
  return {
    title: erTitle,
    code: erCode,
    status: erStatus,
    message: erMessage,
  };
};
