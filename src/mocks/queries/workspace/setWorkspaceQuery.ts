// Generated by `yarn new:queryMock`
import { server } from '../../server'
import { workspaceQuery } from '../workspace'
import { Options } from './type'

export const setWorkspaceQuery = (options: Options) => {
  server.use(workspaceQuery(options))
}
