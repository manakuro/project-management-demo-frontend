import type { TeammateTaskTabStatusCode } from 'src/graphql/enums';
import type { TeammateTaskTabStatusResponse } from 'src/graphql/types/teammateTaskTabStatus';

export type { TeammateTaskTabStatusResponse } from 'src/graphql/types/teammateTaskTabStatus';
export { TeammateTaskTabStatusCode } from 'src/graphql/enums';
export type TeammateTaskTabStatusCodeKey =
  keyof typeof TeammateTaskTabStatusCode;

export type TeammateTaskTabStatus = TeammateTaskTabStatusResponse;
