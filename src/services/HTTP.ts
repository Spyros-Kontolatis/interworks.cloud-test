import axios from "axios";
import type { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import type { Methods, AnyFunction } from "@/types/services/http";
const hrefToUrl = (href: string): URL => new URL(href, "http://localhost:3000");

export class HTTP<T extends object> {
  #method: "get" | "post" | "put" | "delete" = "get";

  #url: URL | null = null;

  #data: T | null = null;

  #headers: AxiosHeaders | null = null;

  #config: AxiosRequestConfig = {};

  #methods: Methods = {
    onBefore: null,
    onStart: null,
    onSuccess: null,
    onNoData: null,
    onFinish: null,
    onError: null,
    onClientError: null,
    onErrorNotFound: null,
    onErrorNotAvailable: null,
    onErrorConflict: null,
  };

  /**
   * @param {string} url
   * @param {"post"|"put"|"delete"|"get"} method
   */
  static make(url: string, method: "post" | "put" | "delete" | "get") {
    return new HTTP(url, method);
  }

  static throwError(visit: Methods, cb: keyof Methods, error: AxiosError) {
    if (visit[cb]) {
      visit[cb]!(error);
      return;
    }
    visit.onError?.(error);
  }

  /**
   * @param {string} url
   * @param {"post"|"put"|"delete"|"get"} method
   */
  constructor(url: string, method: "post" | "put" | "delete" | "get" = "get") {
    this.#url = hrefToUrl(url);
    this.#method = method;
  }

  /**
   * @param {AnyFunction} cb
   */
  onBefore(cb: AnyFunction) {
    this.#methods.onBefore = cb;
    return this;
  }

  /**
   * @param {AnyFunction} cb
   */
  onStart(cb: AnyFunction) {
    this.#methods.onStart = cb;
    return this;
  }

  /**
   * @param {AnyFunction} cb
   */
  onSuccess(cb: AnyFunction) {
    this.#methods.onSuccess = cb;
    return this;
  }

  /**
   * @param {AnyFunction} cb
   */
  onNoData(cb: AnyFunction) {
    this.#methods.onNoData = cb;
    return this;
  }

  /**
   * @param {AnyFunction} cb
   */
  onFinish(cb: AnyFunction) {
    this.#methods.onFinish = cb;
    return this;
  }

  /**
   * @param {AnyFunction} cb
   */
  onError(cb: AnyFunction) {
    this.#methods.onError = cb;
    return this;
  }

  /**
   * @param {AnyFunction} cb
   */
  onClientError(cb: AnyFunction) {
    this.#methods.onClientError = cb;
    return this;
  }

  /**
   * @param {AnyFunction} cb
   */
  onErrorConflict(cb: AnyFunction) {
    this.#methods.onErrorConflict = cb;
    return this;
  }

  /**
   * @param {AnyFunction} cb
   */
  onErrorNotAvailable(cb: AnyFunction) {
    this.#methods.onErrorNotAvailable = cb;
    return this;
  }

  /**
   * @param {AnyFunction} cb
   */
  onErrorNotFound(cb: AnyFunction) {
    this.#methods.onErrorNotFound = cb;
    return this;
  }

  /**
   * @param {T} data
   */
  data(data: T) {
    this.#data = data;
    return this;
  }

  /**
   * @param {AxiosHeaders} headers
   */
  headers(headers: AxiosHeaders) {
    this.#headers = headers;
    return this;
  }

  /**
   * @param {AxiosRequestConfig} config
   */
  config(config: AxiosRequestConfig) {
    this.#config = config;
    return this;
  }

  execute() {
    return this.apiCall();
  }

  async apiCall() {
    const method = this.#method;

    this.#url = new URL(`${this.#url!.origin}${this.#url!.pathname}`);

    const visit = {
      url: this.#url,
      method,
      data: this.#data,
      headers: this.#headers,
      ...this.#methods,
    };

    if (visit.onBefore?.(visit) === false) return;

    visit.onStart?.(visit);

    try {
      const response = await axios({
        method,
        url: visit.url.href,
        baseURL: visit.url.origin,
        data: method === "get" ? {} : visit.data,
        params: method === "get" ? visit.data : {},
        headers: {
          ...this.#headers,
          Accept: "application/json",
        },
        ...this.#config,
      });

      if (!response) {
        throw new Error("No response");
      }

      if (visit.onNoData && response.status === 204) {
        visit.onNoData?.(visit);
        return;
      }

      visit.onSuccess?.(response.data);
      return;
    } catch (error) {
      if (axios.isCancel(error)) return;

      if (!(error as AxiosError).response) {
        visit.onError?.(error);
        return;
      }

      const { status } = (error as AxiosError).response!;

      if (status === 400) {
        HTTP.throwError(visit, "onClientError", error as AxiosError);
        return;
      }

      if (status === 409) {
        HTTP.throwError(visit, "onErrorConflict", error as AxiosError);
        return;
      }

      if (status === 410) {
        HTTP.throwError(visit, "onErrorNotAvailable", error as AxiosError);
        return;
      }

      if (status === 404) {
        HTTP.throwError(visit, "onErrorNotFound", error as AxiosError);
        return;
      }

      visit.onError?.(error);
    } finally {
      visit.onFinish?.(visit);
    }
  }
}
