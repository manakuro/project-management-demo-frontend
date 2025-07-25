import { useAtomValue } from 'jotai';
import { namesByTeammateIdState } from '../atom';

export const useTeammateNamesByTeammateIds = (teammateIds: string[]) => {
  const teammateNames = useAtomValue(namesByTeammateIdState(teammateIds));

  return {
    teammateNames,
  };
};
