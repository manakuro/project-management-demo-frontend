import consola from 'consola'
import { spawnSync } from '../util/spawnSync'
import { getGraphqlFilenames } from './getGraphqlFilenames'

const createGraphqlTypes = async () => {
  const { paths } = await getGraphqlFilenames()

  paths.forEach((file) => {
    spawnSync(`npx hygen new queryType --file ${file}`)
  })

  consola.success('Succeed!')
}

createGraphqlTypes()
