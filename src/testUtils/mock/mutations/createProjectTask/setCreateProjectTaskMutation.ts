// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { createProjectTaskMutation } from '../createProjectTask'
import { Options } from './type'

export const setCreateProjectTaskMutation = (options: Options) => {
  server.use(createProjectTaskMutation(options))
}