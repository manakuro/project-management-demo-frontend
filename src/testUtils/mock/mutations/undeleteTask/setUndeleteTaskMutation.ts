// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { undeleteTaskMutation } from '../undeleteTask'
import { Options } from './type'

export const setUndeleteTaskMutation = (options: Options) => {
  server.use(undeleteTaskMutation(options))
}