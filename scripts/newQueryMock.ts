import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import { spawnSync } from './util/spawnSync'

const argv = yargs(hideBin(process.argv)).argv as unknown as { file: string }

spawnSync('yarn tsc:scripts')
spawnSync(
  argv.file
    ? `node scripts/graphql/createMock.js --file ${argv.file}`
    : 'node scripts/graphql/createMock.js',
)
spawnSync(
  argv.file
    ? `node scripts/graphql/createGraphqlMock.js --file ${argv.file}`
    : 'node scripts/graphql/createGraphqlMock.js',
)
spawnSync(
  'node scripts/graphql/createMockHandler.js && eslint ./src/testUtils/mock/handlers.ts --fix',
)
spawnSync('eslint ./src/testUtils/mock/queries/ --fix')
