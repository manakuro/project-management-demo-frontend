import type { TeammateTaskTabStatus } from '@/store/entities/teammateTaskTabStatus';
import { useCallback } from 'react';
import { useUpsert } from './useUpsert';

export const useTeammateTaskTabStatusResponse = () => {
  const { upsert } = useUpsert();

  const setTeammateTaskTabStatus = useCallback(
    (data: TeammateTaskTabStatus) => {
      upsert(data);
    },
    [upsert],
  );

  return {
    setTeammateTaskTabStatus,
  };
};
