module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: '\\.(test|spec)\\.ts$',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/index.ts',
    '!**/*.{spec,test,mock}.ts',
    '!**/{__tests__,tests,__mocks__,mocks}/**/*',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  reporters: ['default', 'jest-junit'],
};
