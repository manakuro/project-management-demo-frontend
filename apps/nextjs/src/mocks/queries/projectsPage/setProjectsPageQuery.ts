// Generated by `yarn new:queryMock`
import { server } from '../../server';
import { projectsPageQuery } from '../projectsPage';
import type { Options } from './type';

export const setProjectsPageQuery = (options: Options) => {
  server.use(projectsPageQuery(options));
};
