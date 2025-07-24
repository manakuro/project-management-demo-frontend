import { useAtomCallback } from 'jotai/utils';
import { RESET } from 'jotai/utils';
import { useCallback } from 'react';
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

export const useTeammateTaskCommand = () => {
  const { me } = useMe();
  const { workspace } = useWorkspace();
  const { addTask } = useTaskCommand();
  const [createTeammateTaskMutation] = useCreateTeammateTaskMutation();
  const [updateTeammateTaskMutation] = useUpdateTeammateTaskMutation();
  const { setTeammateTask } = useTeammateTaskResponse();

  const setTeammateTaskByTaskId = useAtomCallback(
    useCallback(
      async (get, set, taskId: string, input: Partial<TeammateTask>) => {
        const prev = get(teammateTaskByTaskIdState(taskId));
        const updated = { ...prev, ...input };
        set(teammateTaskState(prev.id), updated);

        const restore = () => {
          set(teammateTaskState(prev.id), prev);
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
            set(teammateTaskState(prev.id), prev);
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateTeammateTaskMutation],
    ),
  );

  const addTeammateTask = useAtomCallback(
    useCallback(
      async (
        _,
        set,
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
        set(teammateTaskState(id), newTeammateTask);

        const restore = () => {
          set(teammateTaskState(id), RESET);
          set(taskState(newTaskId), RESET);
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

          set(teammateTaskState(id), RESET);
          set(taskState(newTaskId), RESET);
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
        workspace.id,
      ],
    ),
  );

  return {
    addTeammateTask,
    setTeammateTaskByTaskId,
  };
};
