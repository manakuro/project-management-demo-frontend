// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { updateTeammateTaskListStatusMutation } from '../updateTeammateTaskListStatus'
import { Options } from './type'

export const setUpdateTeammateTaskListStatusMutation = (options: Options) => {
  server.use(updateTeammateTaskListStatusMutation(options))
}