import { useRecoilCallback } from 'recoil';
import { projectLightColorState } from '../atom';

export const useResetProjectLightColor = () => {
  const resetProjectLightColor = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(projectLightColorState(id));
      },
    [],
  );

  const resetProjectLightColors = useRecoilCallback(
    ({ reset }) =>
      (projectLightColors: string[]) => {
        projectLightColors.forEach((id) => {
          reset(projectLightColorState(id));
        });
      },
    [],
  );

  return {
    resetProjectLightColor,
    resetProjectLightColors,
  };
};
