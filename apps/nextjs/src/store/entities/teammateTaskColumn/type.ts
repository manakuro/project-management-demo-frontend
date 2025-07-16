import type { TeammateTaskColumnResponse } from 'src/graphql/types/teammateTaskColumn';

export type { TeammateTaskColumnResponse } from 'src/graphql/types/teammateTaskColumn';

export type TeammateTaskColumn = Omit<TeammateTaskColumnResponse, 'taskColumn'>;
