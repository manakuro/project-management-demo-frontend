// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { updateTeammateTaskMutation } from '../updateTeammateTask'
import { Options } from './type'

export const setUpdateTeammateTaskMutation = (options: Options) => {
  server.use(updateTeammateTaskMutation(options))
}
