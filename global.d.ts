export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_CONTRACT_MOCKS: string
    }
  }
}
