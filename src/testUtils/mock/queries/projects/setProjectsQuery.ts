// Generated by `yarn new:queryMock`
import { server } from '../../server'
import { projectsQuery } from '../projects'
import { Options } from './type'

export const setProjectsQuery = (options: Options) => {
  server.use(projectsQuery(options))
}
