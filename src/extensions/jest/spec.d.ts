export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toComplyWithAPIContract(httpMethod: string, endpointPath: string): R;
    }
  }
}
