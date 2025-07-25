// Generated by `yarn new:mutationMock`
import { server } from '../../server';
import { updateProjectTaskMutation } from '../updateProjectTask';
import type { Options } from './type';

export const setUpdateProjectTaskMutation = (options: Options) => {
  server.use(updateProjectTaskMutation(options));
};
