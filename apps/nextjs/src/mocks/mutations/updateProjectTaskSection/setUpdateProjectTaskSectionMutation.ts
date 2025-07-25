// Generated by `yarn new:mutationMock`
import { server } from '../../server';
import { updateProjectTaskSectionMutation } from '../updateProjectTaskSection';
import type { Options } from './type';

export const setUpdateProjectTaskSectionMutation = (options: Options) => {
  server.use(updateProjectTaskSectionMutation(options));
};
