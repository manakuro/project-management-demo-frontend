const testMatch = () => {
  if (process.env.INTEGRATION) return ['**/src/**/?(*.)+(integ).[jt]s?(x)']

  return ['**/src/**/?(*.)+(spec|test).[jt]s?(x)']
}

module.exports = {
  testEnvironment: 'jsdom',
  globals: {
    __DEV__: true,
  },
  testMatch: testMatch(),
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/jest-plugin-context/setup',
    '<rootDir>/setupTests.js',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'd.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$':
      'empty/object',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(lodash-es|uuid|@react-hook|emoji-mart))',
  ],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
}
