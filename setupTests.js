import '@testing-library/jest-dom/extend-expect'

global.fetch = require('node-fetch')

jest.mock('src/config')
jest.retryTimes(3, { logErrorsBeforeRetry: true })
