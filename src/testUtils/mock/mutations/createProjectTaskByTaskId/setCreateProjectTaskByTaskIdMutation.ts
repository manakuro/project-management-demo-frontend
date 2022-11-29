// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { createProjectTaskByTaskIdMutation } from '../createProjectTaskByTaskId'
import { Options } from './type'

export const setCreateProjectTaskByTaskIdMutation = (options: Options) => {
  server.use(createProjectTaskByTaskIdMutation(options))
}
