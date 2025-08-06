module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/ts'],
  testMatch: ['**/test/**/*.ts', '!**/test/fixtures/**', '!**/test/helpers.ts'],
  collectCoverageFrom: [
    'ts/functions/**/*.ts',
    '!ts/functions/index.ts'
  ],
  moduleDirectories: ['node_modules', 'ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json'
    }]
  }
}