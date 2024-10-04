import { Cart } from "@/types/stores/cart/cart";
import { HTTP } from "./HTTP";

export default class Service {
  static products() {
    const baseURL = "/products";

    return {
      index: () => {
        const path = baseURL;
        return HTTP.make(path, "get");
      },
      get: (productId: string) => {
        const path = `${baseURL}/${productId}`;
        return HTTP.make(path, "get");
      },
    };
  }
  static cart() {
    const baseURL = "/cart";
    return {
      index: () => {
        const path = baseURL;
        return HTTP.make(path, "get");
      },
      get: (cartId: string) => {
        const path = `${baseURL}/${cartId}`;
        return HTTP.make(path, "get");
      },
      create: (data: Cart) => {
        const path = baseURL;
        return HTTP.make(path, "post").data(data);
      },
      update: (id: string, data: Cart) => {
        const path = `${baseURL}/${id}`;
        return HTTP.make(path, "put").data(data);
      },
    };
  }
}
