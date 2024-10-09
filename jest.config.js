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
  collectCoverage: true, // Включить сбор покрытия
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}', // Укажите пути к вашим файлам для покрытия
    '!**/node_modules/**', // Исключить node_modules
    '!**/vendor/**', // Исключить vendor
  ],
  coverageDirectory: 'coverage', // Директория для отчетов
  coverageReporters: ['text', 'lcov'], // Виды отчетов
}
