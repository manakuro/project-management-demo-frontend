// Generated by `yarn new:queryMock`
import { server } from '../../server'
import { myTasksPageQuery } from '../myTasksPage'
import { Options } from './type'

export const setMyTasksPageQuery = (options: Options) => {
  server.use(myTasksPageQuery(options))
}
