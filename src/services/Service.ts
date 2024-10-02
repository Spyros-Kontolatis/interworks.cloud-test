import { HTTP } from "./HTTP";

export default class Service {
  static products() {
    const baseURL = "/products";

    return {
      index: () => {
        const path = baseURL;
        return HTTP.make(path, "get");
      },
      get: (productId: number) => {
        const path = `${baseURL}/${productId}`;
        return HTTP.make(path, "get");
      },
    };
  }
}
