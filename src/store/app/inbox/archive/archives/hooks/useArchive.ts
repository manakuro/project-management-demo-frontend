import { useRecoilValue } from 'recoil';
import { archiveState } from '../atom';

export const useArchive = (archiveId: string) => {
  const archive = useRecoilValue(archiveState(archiveId));

  return {
    archive,
  };
};
