import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { AppError, Header, HttpResponse } from "../interfaces/services";
import { deleteItem } from "../tools/storage";
import { Alert } from "react-native";
import { logoutExecute } from "../redux/actions/authorization";
import { store } from "../redux/store";
import listingData from "../data/listingData.json";
import quoteData from "../data/quoteData.json";
import Config from "react-native-config";
import { clearMessage, setMessage } from "../redux/actions/notification";
import { genericMessages } from "../configuration/messages";
import { ModalMessage } from "../interfaces/buttons";

const config = {
  baseURL: Config.REACT_APP_MARKET_API_BASEURL,
};

export const axiosInstance = axios.create(config);

/**
 * API Calls Handler
 * @param {string} endpoint Endpoint path
 * @param {string} method HTTP Method
 * @param {Header?} header Headers si los necesitase
 * @param {unknown?} body Request body
 * @param {unknown?} parameters Query params
 * @returns {T} respuesta del servicio
 */
export const ApiCall = async <T>(
  endpoint: string,
  method: string,
  header?: Header,
  body?: unknown,
  parameters?: unknown,
): Promise<T> => {
  try {
    const formHeaders = setRequestHeaders(header);
    const requestConfig: AxiosRequestConfig = {
      method: method as Method,
      url: endpoint,
      data: body,
      params: parameters,
      headers: formHeaders,
    };
    const response = await axiosInstance.request<T>(requestConfig);
    return response?.data;
  } catch (err) {
    const newError = handleError(err);
    /* 
    if (newError.code == 401 || newError.status == 401) {
      store.dispatch(logoutExecute());
      await deleteItem("@accessTokenGoogle");
    }
    */
    handleErrorMessage(newError);
    throw newError;
  }
};

export const ApiCallMock = <T>(key: string) => {
  const httpResponse: { [key: string]: any } = {
    listing: listingData,
    "1": quoteData,
  };
  console.log(key, httpResponse);
  return httpResponse[key] as T;
};

/**
 * Muestra el error en el modal
 * @param {AppError} error Error del servicio
 */
export const handleErrorMessage = (error: AppError) => {
  const newMessage: ModalMessage = {
    title: error.title || "Error",
    content: error.message,
    selfClose: false,
    isVisible: true,
    actions: {
      primary: {
        content: genericMessages.ok,
        onPress: () => {
          store.dispatch(clearMessage());
        },
      },
    },
  };
  store.dispatch(setMessage(newMessage));
};

/**
 * Manejador de error
 * @param {unknown} error Error desconocido del llamado http con axios
 * @returns {AppError} error configurado para la app
 */
export const handleError = (error: unknown): AppError => {
  const erMessage = "Ha ocurrido un error";
  const erCode = 500;
  const erStatus = 500;
  const erTitle = "Error";

  const errorAxios = error as AxiosError;
  if (errorAxios) {
    return {
      title: erTitle,
      message: errorAxios.message,
      code: parseInt(errorAxios.code ?? "400", 10),
      status: errorAxios.status,
    };
  }

  const errorHttp = error as HttpResponse;
  if (errorHttp && errorHttp.code) {
    console.log("HttpResponse", errorHttp);
    return {
      title: erTitle,
      message: errorHttp.message,
      code: errorHttp.code,
      status: errorHttp.status,
    };
  }

  const errorGeneric = error as Error;
  if (errorGeneric && errorGeneric.message) {
    console.log("http Error", errorGeneric);
    if (errorGeneric.message === "NETWORK_ERROR") {
      Alert.alert("Error de Conexion");
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

/**
 * Crea los cabezales para el request HTTP
 * @param {Header} headers Headers en caso de ser necesario
 * @param {string} token token de la app
 */
export const setRequestHeaders = (
  header?: Header,
  token?: string | null,
): Header => {
  const formHeaders = header || headers;
  return {
    ...formHeaders,
    "X-CMC_PRO_API_KEY": Config.REACT_APP_MARKET_API_KEY ?? "x",
  };
};

export const headers: Header = {
  Accept: "*/*",
};
