import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import { spawnSync } from './util/spawnSync'

const argv = yargs(hideBin(process.argv)).argv as unknown as { file: string }

spawnSync('yarn tsc:scripts')
spawnSync(
  argv.file
    ? `node scripts/graphql/createQueryMock.js --file ${argv.file}`
    : 'node scripts/graphql/createQueryMock.js',
)
spawnSync(
  'node scripts/graphql/createQueryMockHandler.js && eslint ./src/testUtils/mock/handlers.ts --fix',
)
spawnSync('eslint ./src/testUtils/mock/queries/ --fix')
