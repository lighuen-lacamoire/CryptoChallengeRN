import {
  ApiResponse,
  CryptoCurrencyByKey,
  CryptoCurrencyDto,
} from "../interfaces/backend";
import { Endpoints } from "../tools/crypto";
import { ApiCall } from "./api";

/**
 * Consulta la cotizacion por Id
 * @param id id de crypto moneda
 */
export const quotesByIdRequest = async (id?: string) =>
  ApiCall<ApiResponse<CryptoCurrencyByKey>>(
    Endpoints.cryptoCurrency.quotesById.url(id),
    Endpoints.cryptoCurrency.quotesById.method,
    undefined,
    undefined,
  );

/**
 * Consulta el listado de Cryptos
 * @param currency brinda la equivalencia a la moneda
 */
export const listingRequest = async (currency?: string) =>
  ApiCall<ApiResponse<CryptoCurrencyDto[]>>(
    Endpoints.cryptoCurrency.listing.url(currency),
    Endpoints.cryptoCurrency.listing.method,
    undefined,
    undefined,
  );
