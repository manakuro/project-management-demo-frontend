// Generated by `yarn new:queryMock`
import { server } from '../../server';
import { projectLightColorsQuery } from '../projectLightColors';
import type { Options } from './type';

export const setProjectLightColorsQuery = (options: Options) => {
  server.use(projectLightColorsQuery(options));
};
