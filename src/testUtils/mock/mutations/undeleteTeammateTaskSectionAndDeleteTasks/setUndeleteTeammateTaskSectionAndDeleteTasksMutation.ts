// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { undeleteTeammateTaskSectionAndDeleteTasksMutation } from '../undeleteTeammateTaskSectionAndDeleteTasks'
import { Options } from './type'

export const setUndeleteTeammateTaskSectionAndDeleteTasksMutation = (
  options: Options,
) => {
  server.use(undeleteTeammateTaskSectionAndDeleteTasksMutation(options))
}
