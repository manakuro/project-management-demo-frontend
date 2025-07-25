// Generated by `yarn new:mutationMock`
import { server } from '../../server';
import { createTaskFeedMutation } from '../createTaskFeed';
import type { Options } from './type';

export const setCreateTaskFeedMutation = (options: Options) => {
  server.use(createTaskFeedMutation(options));
};
