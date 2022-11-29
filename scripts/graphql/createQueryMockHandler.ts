import consola from 'consola'
import { spawnSync } from '../util/spawnSync'

const createGraphqlMock = () => {
  spawnSync('npx hygen new queryMockHandler')

  consola.success('Succeed!')
}

createGraphqlMock()
