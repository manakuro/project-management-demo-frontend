// Generated by `yarn new:mutationMock`
import type deepmerge from 'deepmerge';
import type { CreateTeammateTaskSectionMutation as Mutation } from 'src/graphql/types/index.mock';
import type { DeepPartial } from 'utility-types';

export type Response = DeepPartial<Mutation>;
export type { CreateTeammateTaskSectionMutation as Mutation } from 'src/graphql/types/index.mock';

export type Options = {
  res?: Response;
  networkError?: boolean;
  deepMergeOptions?: deepmerge.Options;
};
