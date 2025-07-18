import { useRecoilCallback, useRecoilValue } from 'recoil';
import { deletedTaskState } from '../atom';
import type { DeletedTask } from '../type';

export const useDeletedTask = (deletedTaskId: string) => {
  const deletedTask = useRecoilValue(deletedTaskState(deletedTaskId));

  const upsert = useRecoilCallback(
    ({ set }) =>
      (deletedTask: DeletedTask) => {
        set(deletedTaskState(deletedTask.id), deletedTask);
      },
    [],
  );
  const setDeletedTask = useRecoilCallback(
    ({ snapshot }) =>
      async (input: Partial<DeletedTask>) => {
        const prev = await snapshot.getPromise(
          deletedTaskState(deletedTask.id),
        );
        upsert({
          ...prev,
          ...input,
        });
      },
    [deletedTask.id, upsert],
  );

  return {
    deletedTask,
    setDeletedTask,
  };
};
