// Generated by `yarn new:queryMock`
import { server } from '../../server'
import { workspacePageQuery } from '../workspacePage'
import { Options } from './type'

export const setWorkspacePageQuery = (options: Options) => {
  server.use(workspacePageQuery(options))
}