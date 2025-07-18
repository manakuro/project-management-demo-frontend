import consola from 'consola'
import { spawnSync } from '../util/spawnSync'
import { getQueryFilenames } from './getQueryFilenames'

const createQuerylTypes = async () => {
  const { paths } = await getQueryFilenames()

  paths.forEach((file) => {
    spawnSync(`npx hygen new queryType --file ${file}`)
  })

  consola.success('Succeed!')
}

createQuerylTypes()
