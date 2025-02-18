import { GoogleOAuthFullLogin } from '../interfaces/google';
import { appConfig } from '../configuration/constants';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { deleteItem, saveItem } from '../tools/storage';
import { handleError } from './api';

/**
 * Realiza el login por OAuth
 */
const getLogginOAuth2Google = async (): Promise<GoogleOAuthFullLogin> => {
  try {
    /**
     * Configuracion de google
     */
    GoogleSignin.configure({
      scopes: appConfig.google.scopes,
      webClientId: appConfig.google.clientId, // REPLACE WITH YOUR ACTUAL  CLIENT ID !
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
    if (access && access.accessToken) {
      await saveItem('@accessTokenGoogle', access.accessToken);
    } else {
      throw Error('No se pudo obtener el token');
    }
    return { token: access, info: userInfo };
  } catch (err) {
    const newError = handleError(err);
    throw newError;
  }
};

/**
 * Realiza el logout de la API de google
 */
const getSignoutOAuth2Google = async (): Promise<void> => {
  try {
    GoogleSignin.configure({
      scopes: appConfig.google.scopes,
      webClientId: appConfig.google.clientId, // REPLACE WITH YOUR ACTUAL  CLIENT ID !
      offlineAccess: false,
    });
    await GoogleSignin.signOut();
    await deleteItem('@accessTokenGoogle');
  } catch (error) {
    throw handleError(error);
  }
};

export { getLogginOAuth2Google, getSignoutOAuth2Google };
