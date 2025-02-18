export interface IMainMethods<T> {
  data?: T;
  error?: IError;
}

export interface IError {
  statusCode: number;
  statusText: string;
}

export interface Header {
  [key: string]: string;
}
export type HttpResponse = {
  code?: string | number;
  status?: string | number;
  message?: string;
  user?: string;
};

export interface ErrorDetail {
  domain: string;
  reason: string;
  message: string;
  locationType: string;
  location: string;
}

export interface AppError {
  errors?: ErrorDetail[];
  code?: string | number;
  status?: string | number;
  message?: string;
  title?: string;
}

export type OAuthUrlProps = {
  authorizeUrl: string;
  clientId: string;
  redirectUri: string;
  responseType: string;
  scopes: string[];
  state?: string;
  prompt?: string;
  accessType?: string;
};

export type OAuthRequest = {
  code: string;
  client_id: string;
  redirect_uri: string;
  grant_type: string;
  client_secret?: string;
};
