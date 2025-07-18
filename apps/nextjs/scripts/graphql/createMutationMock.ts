import path from 'path'
import consola from 'consola'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import { spawnSync } from '../util/spawnSync'
import { getMutationFilenames } from './getMutationFilenames'

const argv = yargs(hideBin(process.argv)).argv as unknown as { file: string }

const createMutationMock = async () => {
  if (argv.file) {
    const file = path.resolve('.', argv.file as string)
    spawnSync(`npx hygen new mutationMock --file ${file}`)
    consola.success('Succeed!')
    return
  }

  const { paths } = await getMutationFilenames()
  paths.forEach((file: string) => {
    spawnSync(`npx hygen new mutationMock --file ${file}`)
  })

  consola.success('Succeed!')
}

createMutationMock()
