import { NotificationState } from "../../interfaces/reducers";
import { Action } from "../../interfaces/actions";

/** SET_MESSAGE */
export const SET_MESSAGE = "cryptomarket/notification/SET_MESSAGE";
/** CLEAR_MESSAGE */
export const CLEAR_MESSAGE = "cryptomarket/notification/CLEAR_MESSAGE";

export const initialState: NotificationState = {
  message: undefined,
};

export default (state = initialState, action: Action): NotificationState => {
  switch (action.type) {
    case SET_MESSAGE: {
      const { message } = action.payload;
      return {
        ...state,
        message,
      };
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: undefined,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
