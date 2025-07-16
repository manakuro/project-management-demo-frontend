import { useRecoilCallback } from 'recoil';
import {
  useCreateTeammateTaskMutation,
  useUpdateTeammateTaskMutation,
} from 'src/graphql/hooks';
import { uuid } from 'src/shared/uuid';
import { useMe } from 'src/store/entities/me';
import { taskState, useTaskCommand } from 'src/store/entities/task';
import { useWorkspace } from 'src/store/entities/workspace';
import {
  initialState,
  teammateTaskByTaskIdState,
  teammateTaskState,
} from '../atom';
import type { TeammateTask } from '../type';
import { TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskCreatedSubscription';
import { useTeammateTaskResponse } from './useTeammateTaskResponse';
import { TEAMMATE_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskUpdatedSubscription';
import { useUpsert } from './useUpsert';

export const useTeammateTaskCommand = () => {
  const { me } = useMe();
  const { workspace } = useWorkspace();
  const { addTask } = useTaskCommand();
  const [createTeammateTaskMutation] = useCreateTeammateTaskMutation();
  const [updateTeammateTaskMutation] = useUpdateTeammateTaskMutation();
  const { setTeammateTask } = useTeammateTaskResponse();
  const { upsert } = useUpsert();

  const setTeammateTaskByTaskId = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, input: Partial<TeammateTask>) => {
        const prev = await snapshot.getPromise(
          teammateTaskByTaskIdState(taskId),
        );
        upsert({ ...prev, ...input });

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateTeammateTaskMutation({
            variables: {
              input: {
                ...input,
                id: prev.id,
                workspaceId: prev.workspaceId,
                requestId: TEAMMATE_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.errors) {
            upsert(prev);
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
    [updateTeammateTaskMutation, upsert],
  );

  const addTeammateTask = useRecoilCallback(
    ({ reset }) =>
      async (
        input: Partial<TeammateTask> & {
          teammateTaskSectionId: string;
          taskParentId?: string;
        },
      ) => {
        const id = uuid();
        const newTaskId = addTask({
          assigneeId: me.id,
          taskParentId: input.taskParentId || '',
        });
        const newTeammateTask = {
          ...initialState(),
          ...input,
          id,
          taskId: newTaskId,
          teammateId: me.id,
        };
        upsert(newTeammateTask);

        const restore = () => {
          reset(teammateTaskState(id));
          reset(taskState(newTaskId));
        };

        try {
          const res = await createTeammateTaskMutation({
            variables: {
              input: {
                teammateId: me.id,
                teammateTaskSectionId: input.teammateTaskSectionId,
                workspaceId: workspace.id,
                taskParentId: input.taskParentId ?? null,
                requestId: TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });
          if (res.errors) {
            restore();
            return '';
          }

          const data = res.data?.createTeammateTask;
          if (!data) return '';

          reset(teammateTaskState(id));
          reset(taskState(newTaskId));
          setTeammateTask([data]);

          return data.id;
        } catch (e) {
          restore();
          throw e;
        }
      },
    [
      addTask,
      createTeammateTaskMutation,
      me.id,
      setTeammateTask,
      upsert,
      workspace.id,
    ],
  );

  return {
    addTeammateTask,
    setTeammateTaskByTaskId,
  };
};
