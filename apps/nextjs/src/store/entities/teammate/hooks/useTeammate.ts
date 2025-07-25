import { useAtomValue } from 'jotai';
import { teammateState } from '../atom';

export const useTeammate = (teammateId?: string) => {
  const teammate = useAtomValue(teammateState(teammateId || ''));

  return {
    teammate,
  };
};
