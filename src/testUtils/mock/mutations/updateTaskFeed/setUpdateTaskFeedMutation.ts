// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { updateTaskFeedMutation } from '../updateTaskFeed'
import { Options } from './type'

export const setUpdateTaskFeedMutation = (options: Options) => {
  server.use(updateTaskFeedMutation(options))
}
