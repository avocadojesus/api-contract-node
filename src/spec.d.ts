export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toComplyWithAPIContract(received: { [key: string]: any }): R;
    }
  }
}
