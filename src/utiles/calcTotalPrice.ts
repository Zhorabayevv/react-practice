import { ProductInterface } from "../redux/basket/types";

export const calcTotalPrice = (basket: ProductInterface[]) => {
  return basket.reduce(
    (sum, product) => sum + product.price * product.count,
    0
  );
};
