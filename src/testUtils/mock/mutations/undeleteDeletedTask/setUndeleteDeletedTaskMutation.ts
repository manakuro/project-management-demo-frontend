// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { undeleteDeletedTaskMutation } from '../undeleteDeletedTask'
import { Options } from './type'

export const setUndeleteDeletedTaskMutation = (options: Options) => {
  server.use(undeleteDeletedTaskMutation(options))
}