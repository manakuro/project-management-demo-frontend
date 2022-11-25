import path from 'path'
import consola from 'consola'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import { spawnSync } from '../util/spawnSync'
import { getGraphqlFilenames } from './getGraphqlFilenames'

const argv = yargs(hideBin(process.argv)).argv as unknown as { file: string }

const createGraphqlMock = async () => {
  if (argv.file) {
    const file = path.resolve('.', argv.file as string)
    spawnSync(`npx hygen new queryMock --file ${file}`)
    consola.success('Succeed!')
    return
  }

  const { paths } = await getGraphqlFilenames()
  paths.forEach((file: string) => {
    spawnSync(`npx hygen new queryMock --file ${file}`)
  })

  consola.success('Succeed!')
}

createGraphqlMock()
