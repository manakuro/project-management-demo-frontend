import { useRecoilCallback } from 'recoil';
import { projectIconState } from '../atom';

export const useResetProjectIcon = () => {
  const resetProjectIcon = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(projectIconState(id));
      },
    [],
  );

  const resetProjectIcons = useRecoilCallback(
    ({ reset }) =>
      (projectIcons: string[]) => {
        projectIcons.forEach((id) => {
          reset(projectIconState(id));
        });
      },
    [],
  );

  return {
    resetProjectIcon,
    resetProjectIcons,
  };
};
