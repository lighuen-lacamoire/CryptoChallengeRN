import { GoogleOAuthFullLogin } from "../interfaces/google";
import { appConfig } from "../configuration/constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { deleteItem, saveItem } from "../tools/storage";
import Config from "react-native-config";
import { handleError } from "./api";

/**
 * Realiza el login por OAuth
 */
const logginOAuth = async (): Promise<GoogleOAuthFullLogin> => {
  try {
    /**
     * Configuracion de google
     */
    GoogleSignin.configure({
      scopes: appConfig.google.scopes,
      webClientId: Config.REACT_APP_OAUTH_GOOGLE_CLIENT_ID,
      offlineAccess: false,
    });
    /**
     * Realiza el logueo
     */
    const userInfo = await GoogleSignin.signIn();
    /**
     * Obtiene el Token de acceso de google
     */
    const access = await GoogleSignin.getTokens();
    if (access && access.accessToken && userInfo.data) {
      await saveItem("@accessTokenGoogle", access.accessToken);
      return { token: access, info: userInfo.data };
    } else {
      throw Error("No se pudo obtener el token");
    }
  } catch (err) {
    const newError = handleError(err);
    throw newError;
  }
};

/**
 * Realiza el logout de la API de google
 */
const signoutOAuth = async (): Promise<void> => {
  try {
    GoogleSignin.configure({
      scopes: appConfig.google.scopes,
      webClientId: Config.REACT_APP_OAUTH_GOOGLE_CLIENT_ID, // REPLACE WITH YOUR ACTUAL  CLIENT ID !
      offlineAccess: false,
    });
    await GoogleSignin.signOut();
    await deleteItem("@accessTokenGoogle");
  } catch (error) {
    throw handleError(error);
  }
};

export { logginOAuth, signoutOAuth };
