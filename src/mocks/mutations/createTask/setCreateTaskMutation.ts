// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { createTaskMutation } from '../createTask'
import { Options } from './type'

export const setCreateTaskMutation = (options: Options) => {
  server.use(createTaskMutation(options))
}
