import type { ProjectTaskColumnResponse } from 'src/graphql/types/projectTaskColumn';

export type { ProjectTaskColumnResponse } from 'src/graphql/types/projectTaskColumn';

export type ProjectTaskColumn = Omit<ProjectTaskColumnResponse, 'taskColumn'>;
