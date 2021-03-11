export default {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',

  testMatch: [
    //   "**/__tests__/**/*.[jt]s?(x)",
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
}
