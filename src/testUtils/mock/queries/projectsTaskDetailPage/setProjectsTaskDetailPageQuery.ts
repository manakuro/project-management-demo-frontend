// Generated by `yarn new:queryMock`
import { server } from '../../server'
import { projectsTaskDetailPageQuery } from '../projectsTaskDetailPage'
import { Options } from './type'

export const setProjectsTaskDetailPageQuery = (options: Options) => {
  server.use(projectsTaskDetailPageQuery(options))
}