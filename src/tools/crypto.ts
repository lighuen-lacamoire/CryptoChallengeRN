export const Endpoints = {
  cryptoCurrency: {
    quotesById: {
      url: (id?: string) =>
        `/v1/cryptocurrency/quotes/latest${id ? `?id=${id}` : ""}`,
      method: "GET",
    },
    listing: {
      url: (currency?: string) =>
        `v1/cryptocurrency/listings/latest?start=1&limit=500&convert=${
          currency || "USD"
        }`,
      method: "GET",
    },
  },
};
