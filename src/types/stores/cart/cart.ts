import { Product } from "../../components/products/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: Array<CartItem>;
  totalQty: number;
  totalPrice: number;
};
