/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    'jest-plugin-context/setup',
  ],
  modulePathIgnorePatterns: ['dist'],
};
