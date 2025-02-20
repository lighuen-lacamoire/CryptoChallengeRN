import { CurrencyBasicDto } from "./backend";
import { MessageTitle } from "./configurations";
import { GoogleUserResult } from "./google";
import { AppError } from "./services";

export interface StatusState {
  loading?: boolean;
  active?: boolean;
  failure?: MessageTitle;
  closeApp: boolean;
}

export interface AuthorizationState {
  user?: GoogleUserResult;
  error?: AppError;
  accessToken?: string;
  lastLogin?: number;
  lastRefresh?: number;
}

export interface BalanceState {
  favourites: CurrencyBasicDto[];
}
