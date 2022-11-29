// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { deleteTaskMutation } from '../deleteTask'
import { Options } from './type'

export const setDeleteTaskMutation = (options: Options) => {
  server.use(deleteTaskMutation(options))
}
