import { useRecoilCallback } from 'recoil';
import { projectIconState } from '../atom';
import type { ProjectIcon } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (projectIcon: ProjectIcon) => {
        set(projectIconState(projectIcon.id), projectIcon);
      },
    [],
  );

  return {
    upsert,
  };
};
