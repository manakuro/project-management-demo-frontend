// Generated by `yarn new:queryMock`
import { server } from '../../server';
import { myTasksPageQuery } from '../myTasksPage';
import type { Options } from './type';

export const setMyTasksPageQuery = (options: Options) => {
  server.use(myTasksPageQuery(options));
};
