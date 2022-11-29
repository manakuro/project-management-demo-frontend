import consola from 'consola'
import { spawnSync } from '../util/spawnSync'

spawnSync('npx hygen new mutationMockHandler')

consola.success('Succeed!')
