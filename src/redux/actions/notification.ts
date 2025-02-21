import { Action } from "../../interfaces/actions";
import { ModalMessage } from "../../interfaces/buttons";
import { SET_MESSAGE, CLEAR_MESSAGE } from "../reducers/notification";

/**
 * Setea un error
 */
export const setMessage = (message?: ModalMessage): Action => ({
  type: SET_MESSAGE,
  payload: {
    message,
  },
});

/**
 * Limpia el error actual
 */
export const clearMessage = (): Action => ({
  type: CLEAR_MESSAGE,
});
