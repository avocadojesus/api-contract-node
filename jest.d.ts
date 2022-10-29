export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toPassCompliance(httpMethod: string, endpointPath: string): R;
    }
  }
}
