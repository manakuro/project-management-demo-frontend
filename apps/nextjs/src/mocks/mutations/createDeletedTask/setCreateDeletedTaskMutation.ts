// Generated by `yarn new:mutationMock`
import { server } from '../../server';
import { createDeletedTaskMutation } from '../createDeletedTask';
import type { Options } from './type';

export const setCreateDeletedTaskMutation = (options: Options) => {
  server.use(createDeletedTaskMutation(options));
};
