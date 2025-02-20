import { Action } from "../../interfaces/actions";
import { CurrencyBasicDto } from "../../interfaces/backend";
import { CURRENCY_ADD, CURRENCY_REMOVE } from "../reducers/balance";

/**
 * Agrega un item a la lista
 * @param {CurrencyBasicDto} item item para la lista
 */
export const currencyAdd = (item: CurrencyBasicDto): Action => ({
  type: CURRENCY_ADD,
  payload: { item },
});

export const currencyRemove = (id: number): Action => ({
  type: CURRENCY_REMOVE,
  payload: { id },
});
