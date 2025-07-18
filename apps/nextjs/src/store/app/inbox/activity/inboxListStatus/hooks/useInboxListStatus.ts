import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { type FilterStatuses, filterStatues, inboxStatusState } from '../atom';
import type { InboxListFilterStatuses } from '../types';
import { useInboxListStatusCommand } from './useInboxListStatusCommand';

const isSortStatusKey = (val: any): val is FilterStatuses =>
  typeof val === 'string';

export const useInboxListStatus = () => {
  const { filterStatus } = useRecoilValue(inboxStatusState);
  const { upsert } = useInboxListStatusCommand();

  const isFiltered = useCallback(
    (status: FilterStatuses) => filterStatus === filterStatues[status],
    [filterStatus],
  );

  const onFilter = useCallback(
    (status: InboxListFilterStatuses | FilterStatuses) => {
      const val = isSortStatusKey(status) ? filterStatues[status] : status;
      upsert({ filterStatus: val });
    },
    [upsert],
  );

  return {
    filterStatus,
    isFiltered,
    onFilter,
  };
};
