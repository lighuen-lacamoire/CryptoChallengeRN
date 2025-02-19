const wait = async (ms: number): Promise<unknown> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const priceConvertion = (price: number, precision?: number) => {
  return (1 / price).toFixed(precision || 8);
};

export { wait, priceConvertion };
