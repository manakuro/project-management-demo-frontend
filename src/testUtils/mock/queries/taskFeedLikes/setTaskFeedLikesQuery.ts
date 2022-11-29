// Generated by `yarn new:queryMock`
import { server } from '../../server'
import { taskFeedLikesQuery } from '../taskFeedLikes'
import { Options } from './type'

export const setTaskFeedLikesQuery = (options: Options) => {
  server.use(taskFeedLikesQuery(options))
}