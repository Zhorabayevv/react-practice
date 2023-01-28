import { ProductInterface } from "../redux/basket/types";
import { calcTotalPrice } from "./calcTotalPrice";
export const getBasketFromLS = () => {
  const basket = localStorage.getItem("basket");
  if (basket) {
    return {
      items: JSON.parse(basket) as ProductInterface[],
      totalPrice: calcTotalPrice(JSON.parse(basket)),
    };
  }
  return {
    items: [],
    totalPrice: 0,
  };
};
