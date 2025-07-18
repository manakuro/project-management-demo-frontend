import { useRecoilCallback } from 'recoil';
import { projectBaseColorState } from '../atom';
import type { ProjectBaseColor } from '../type';

export const useProjectBaseColorsResponse = () => {
  const setProjectBaseColors = useRecoilCallback(
    ({ set }) =>
      (projectBaseColors: ProjectBaseColor[]) => {
        projectBaseColors.forEach((p) => {
          set(projectBaseColorState(p.id), p);
        });
      },
    [],
  );

  return {
    setProjectBaseColors,
  };
};
