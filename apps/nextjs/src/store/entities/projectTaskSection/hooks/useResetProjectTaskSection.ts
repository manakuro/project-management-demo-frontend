import { useRecoilCallback } from 'recoil';
import { projectTaskSectionState } from '../atom';

export const useResetProjectTaskSection = () => {
  const resetProjectTaskSection = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(projectTaskSectionState(id));
      },
    [],
  );

  const resetProjectTaskSections = useRecoilCallback(
    ({ reset }) =>
      (ids: string[]) => {
        ids.forEach((id) => {
          reset(projectTaskSectionState(id));
        });
      },
    [],
  );

  return {
    resetProjectTaskSection,
    resetProjectTaskSections,
  };
};
