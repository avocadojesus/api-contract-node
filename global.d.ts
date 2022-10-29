export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_CONTRACT_MOCKS: string
    }
  }

  namespace jest {
    interface Matchers<R> {
      toPassCompliance(httpMethod: string, endpointPath: string): R;
    }
  }
}
