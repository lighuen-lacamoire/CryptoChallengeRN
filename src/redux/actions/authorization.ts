import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../reducers/authorization";
import { Action } from "../../interfaces/actions";
import { AppError } from "../../interfaces/services";
import { User as GoogleUser } from "@react-native-google-signin/google-signin";

/**
 * Guarda los datos escenciales post login
 * @param {GoogleUser} userInfo Response del EP de login
 * @param {string} accessToken token de acceso
 */
export const loginSuccess = (
  userInfo: GoogleUser,
  accessToken: string,
): Action => ({
  type: LOGIN_SUCCESS,
  payload: { userInfo, accessToken },
});

/**
 * Guarda el error producido en el login
 * @param res Datos del error
 */
export const loginError = (res: AppError): Action => ({
  type: LOGIN_FAILURE,
  payload: res,
});

/**
 * Actualiza el state de redux para el logout
 */
export const logoutExecute = (): Action => ({
  type: LOGOUT,
});
