import type { TeammateTaskTabStatusCode } from '@/graphql/enums';
import type { TeammateTaskTabStatusResponse } from '@/graphql/types/teammateTaskTabStatus';

export type { TeammateTaskTabStatusResponse } from '@/graphql/types/teammateTaskTabStatus';
export { TeammateTaskTabStatusCode } from '@/graphql/enums';
export type TeammateTaskTabStatusCodeKey =
  keyof typeof TeammateTaskTabStatusCode;

export type TeammateTaskTabStatus = TeammateTaskTabStatusResponse;
