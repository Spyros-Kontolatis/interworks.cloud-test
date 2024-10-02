import { currency, currencyPlacedBefore } from "@/config/environment";

export const useCurrency = (price: number): string => {
  const formattedPrice = price.toFixed(2);
  return currencyPlacedBefore
    ? `${currency}${formattedPrice}`
    : `${formattedPrice}${currency}`;
};
