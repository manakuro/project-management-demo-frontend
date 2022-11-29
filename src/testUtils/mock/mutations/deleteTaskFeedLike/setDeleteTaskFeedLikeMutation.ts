// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { deleteTaskFeedLikeMutation } from '../deleteTaskFeedLike'
import { Options } from './type'

export const setDeleteTaskFeedLikeMutation = (options: Options) => {
  server.use(deleteTaskFeedLikeMutation(options))
}