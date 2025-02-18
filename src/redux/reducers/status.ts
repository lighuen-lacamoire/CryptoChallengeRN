import { StatusState } from '../../interfaces/reducers';
import { Action } from '../../interfaces/actions';

/** SET_LOADING */
export const SET_LOADING = 'cryptomarket/status/SET_LOADING';
/** CLEAR_LOADING */
export const CLEAR_LOADING = 'cryptomarket/status/CLEAR_LOADING';
/** SET_FAILURE */
export const SET_FAILURE = 'cryptomarket/status/SET_FAILURE';
/** CLEAR_FAILURE */
export const CLEAR_FAILURE = 'cryptomarket/status/CLEAR_FAILURE';
/** SET_ACTIVE */
export const SET_ACTIVE = 'cryptomarket/status/SET_ACTIVE';
/** CLOSE_APP */
export const CLOSE_APP = 'cryptomarket/status/CLOSE_APP';

export const initialState: StatusState = {
  loading: false,
  active: false,
  failure: undefined,
  closeApp: false,
};

/**
 * Indicadore de actividad:
 * Es un array de keys que mientras posea elementos, se mostrara el loading!
 */
const indicators: string[] = [];

export default (state = initialState, action: Action): StatusState => {
  switch (action.type) {
    case SET_LOADING: {
      const { status, key } = action.payload;
      if (status) {
        indicators.push(key);
      } else {
        const index = indicators.indexOf(key);
        indicators.splice(index, 1);
      }
      return {
        ...state,
        loading: indicators.length !== 0,
      };
    }
    case CLEAR_LOADING: {
      indicators.splice(0, indicators.length);
      return {
        ...state,
        loading: false,
      };
    }
    case SET_FAILURE: {
      const { title, message } = action.payload;
      const error = {
        title,
        message,
      };

      return {
        ...state,
        failure: error,
      };
    }
    case CLEAR_FAILURE: {
      return {
        ...state,
        failure: undefined,
      };
    }
    case SET_ACTIVE: {
      const { active } = action.payload;
      return {
        ...state,
        active,
      };
    }
    case CLOSE_APP:
      return {
        ...state,
        closeApp: action.payload,
      };
    default:
      return {
        ...state,
        closeApp: false,
      };
  }
};
