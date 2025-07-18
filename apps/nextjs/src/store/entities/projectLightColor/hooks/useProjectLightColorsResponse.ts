import { useRecoilCallback } from 'recoil';
import { projectLightColorState } from '../atom';
import type { ProjectLightColor } from '../type';

export const useProjectLightColorsResponse = () => {
  const setProjectLightColors = useRecoilCallback(
    ({ set }) =>
      (data: ProjectLightColor[]) => {
        data.forEach((p) => {
          set(projectLightColorState(p.id), p);
        });
      },
    [],
  );

  return {
    setProjectLightColors,
  };
};
