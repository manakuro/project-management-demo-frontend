// Generated by `yarn new:queryMock`
import { server } from '../../server'
import { homeTaskDetailPageQuery } from '../homeTaskDetailPage'
import { Options } from './type'

export const setHomeTaskDetailPageQuery = (options: Options) => {
  server.use(homeTaskDetailPageQuery(options))
}
