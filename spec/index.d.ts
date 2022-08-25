export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toComplyWithAPIContract(): R;
    }
  }
}
