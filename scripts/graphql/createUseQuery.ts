import consola from 'consola'
import { spawnSync } from '../util/spawnSync'
import { getGraphqlFilenames } from './getGraphqlFilenames'

const createUseQuery = async () => {
  const { abs } = await getGraphqlFilenames()

  abs.forEach((file) => {
    spawnSync(`npx hygen new useQuery --gqlFile ${file} --noPrompt true`)
  })

  consola.success('Succeed!')
}

createUseQuery()
