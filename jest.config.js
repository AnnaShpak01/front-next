module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}
