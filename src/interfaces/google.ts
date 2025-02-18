import { User as GoogleUser } from "@react-native-google-signin/google-signin";

export interface GoogleOAuthFullLogin {
  token: GoogleOauthToken;
  info: GoogleUser;
}

export interface GoogleOauthToken {
  idToken: string;
  accessToken: string;
}

export interface GoogleUserResult {
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
  scopes?: string[];
  idToken: string | null;
  /**
   * Not null only if a valid webClientId and offlineAccess: true was
   * specified in configure().
   */
  serverAuthCode: string | null;
}
