import { useRecoilCallback } from 'recoil';
import { projectState } from '../atom';
import type { Project } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (project: Project) => {
        set(projectState(project.id), (prev) => {
          return {
            ...prev,
            ...project,
            description: {
              ...prev.description,
              ...project.description,
            },
          };
        });
      },
    [],
  );

  return {
    upsert,
  };
};
