import { BalanceState } from "../../interfaces/reducers";
import { Action } from "../../interfaces/actions";
import { CurrencyBasicDto } from "../../interfaces/backend";

export const CURRENCY_ADD = "cryptomarket/balance/CURRENCY_ADD";
export const CURRENCY_REMOVE = "cryptomarket/balance/CURRENCY_REMOVE";

export const initialState: BalanceState = {
  favourites: [],
};

export default (state = initialState, action: Action): BalanceState => {
  switch (action.type) {
    case CURRENCY_ADD: {
      const { favourites } = state;
      const { item } = action.payload;
      const newList: CurrencyBasicDto[] = [...(favourites || [])];
      const idx = newList.findIndex((x) => x.id === item.id);
      if (idx !== -1) {
        newList[idx] = item;
      } else {
        newList.push({ ...item, quote: undefined });
      }
      if (newList) {
        return {
          ...state,
          favourites: newList.sort((a, b) => a.id - b.id),
        };
      } else {
        return { ...state };
      }
    }
    case CURRENCY_REMOVE: {
      const { favourites } = state;
      const { id } = action.payload;
      const newList: CurrencyBasicDto[] = [...(favourites || [])];
      const idx = newList.findIndex((x) => x.id === id);
      if (idx !== -1) {
        newList.splice(idx, 1);
      }
      if (newList) {
        return {
          ...state,
          favourites: newList.sort((a, b) => a.id - b.id),
        };
      } else {
        return { ...state };
      }
    }
    default:
      return state;
  }
};
