import { useRecoilCallback } from 'recoil';
import {
  useUpdateProjectTeammateMutation,
  useUpdateProjectTeammateOwnerMutation,
} from 'src/graphql/hooks';
import { useWorkspace } from 'src/store/entities/workspace';
import {
  ownerProjectTeammateByProjectIdState,
  projectTeammateByProjectIdAndTeammateIdState,
  projectTeammateState,
} from '../atom';
import type { ProjectTeammate } from '../type';
import { useProjectTeammateResponse } from './useProjectTeammateResponse';
import { useUpsert } from './useUpsert';

export const useProjectTeammatesCommand = () => {
  const { upsert } = useUpsert();
  const [updateProjectTeammateOwnerMutation] =
    useUpdateProjectTeammateOwnerMutation();

  const [updateProjectTeammateMutation] = useUpdateProjectTeammateMutation();

  const { workspace } = useWorkspace();
  const { setProjectsTeammates } = useProjectTeammateResponse();

  const setProjectTeammateById = useRecoilCallback(
    ({ snapshot }) =>
      async (input: Partial<ProjectTeammate> & { id: string }) => {
        const prev = await snapshot.getPromise(projectTeammateState(input.id));

        const restore = () => {
          upsert(prev);
        };

        upsert({
          ...prev,
          ...input,
        });

        try {
          const res = await updateProjectTeammateMutation({
            variables: {
              input: {
                ...input,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          });
          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
    [updateProjectTeammateMutation, upsert, workspace.id],
  );

  const setProjectTeammateByProjectIdAndTeammateId = useRecoilCallback(
    ({ snapshot }) =>
      async (
        projectId: string,
        teammateId: string,
        input: Partial<ProjectTeammate>,
      ) => {
        const prev = await snapshot.getPromise(
          projectTeammateByProjectIdAndTeammateIdState({
            projectId,
            teammateId,
          }),
        );
        upsert({
          ...prev,
          ...input,
        });
      },
    [upsert],
  );

  const setOwnerByProjectIdAndTeammateId = useRecoilCallback(
    ({ snapshot }) =>
      async (projectId: string, teammateId: string) => {
        const prev = await snapshot.getPromise(
          ownerProjectTeammateByProjectIdState(projectId),
        );
        if (prev.id) upsert({ ...prev, isOwner: false });

        const restore = () => {
          if (prev.id) upsert({ ...prev, isOwner: true });
        };

        const owner = await snapshot.getPromise(
          projectTeammateByProjectIdAndTeammateIdState({
            projectId,
            teammateId,
          }),
        );
        if (owner.id) upsert({ ...owner, isOwner: true });

        try {
          const res = await updateProjectTeammateOwnerMutation({
            variables: {
              input: {
                teammateId,
                projectId,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          });
          if (res.errors) {
            restore();
            return;
          }
          const data = res.data?.updateProjectTeammateOwner;
          if (!data) return;

          if (!owner.id) setProjectsTeammates([data]);
        } catch (e) {
          restore();
          throw e;
        }
      },
    [
      setProjectsTeammates,
      updateProjectTeammateOwnerMutation,
      upsert,
      workspace.id,
    ],
  );

  return {
    setProjectTeammateById,
    setProjectTeammateByProjectIdAndTeammateId,
    setOwnerByProjectIdAndTeammateId,
  };
};
