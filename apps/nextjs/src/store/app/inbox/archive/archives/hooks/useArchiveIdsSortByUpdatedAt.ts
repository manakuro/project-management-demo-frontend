import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { archiveIdsSortByUpdatedAtState } from '../atom';

export const useArchiveIdsSortByUpdatedAt = () => {
  const ids = useRecoilValue(archiveIdsSortByUpdatedAtState);
  const archiveIds = useMemo(() => ids, [ids]);

  return {
    archiveIds,
  };
};
