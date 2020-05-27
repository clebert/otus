module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    // TODO: set to 100%
    global: {branches: 0, functions: 0, lines: 0, statements: 0},
  },
  restoreMocks: true,
  silent: true,
  testMatch: ['**/src/**/*.test.ts'],
  verbose: true,
};
