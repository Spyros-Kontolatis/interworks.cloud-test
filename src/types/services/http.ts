export type AnyFunction = (...args: any) => any;
export type Methods = {
  onBefore: AnyFunction | null;
  onStart: AnyFunction | null;
  onSuccess: AnyFunction | null;
  onNoData: AnyFunction | null;
  onFinish: AnyFunction | null;
  onError: AnyFunction | null;
  onClientError: AnyFunction | null;
  onErrorNotFound: AnyFunction | null;
  onErrorNotAvailable: AnyFunction | null;
  onErrorConflict: AnyFunction | null;
};
