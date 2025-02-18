import { AuthorizationState } from '../../interfaces/reducers';
import { Action } from '../../interfaces/actions';

export const LOGIN_SUCCESS = 'cryptomarket/authorization/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'cryptomarket/authorization/LOGIN_FAILURE';
export const LOGOUT = 'cryptomarket/authorization/LOGOUT';

export const initialState: AuthorizationState = {
  user: undefined,
  error: undefined,
  lastLogin: undefined,
  lastRefresh: undefined,
};

export default (state = initialState, action: Action): AuthorizationState => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { userInfo, accessToken } = action.payload;

      return {
        ...state,
        accessToken,
        user: userInfo,
        lastLogin: Date.now(),
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        user: undefined,
        accessToken: undefined,
        error: action.payload,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        accessToken: undefined,
        user: undefined,
      };
    }
    default:
      return state;
  }
};
