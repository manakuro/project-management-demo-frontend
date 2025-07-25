import { useAtomValue } from 'jotai';
import { archiveState } from '../atom';

export const useArchive = (archiveId: string) => {
  const archive = useAtomValue(archiveState(archiveId));

  return {
    archive,
  };
};
