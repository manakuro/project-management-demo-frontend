import type React from 'react';
import { memo } from 'react';
import { useFirstRender } from 'src/hooks';
import { useSubTasksQuery } from 'src/hooks/queries/entities';
import { useSubtaskIds } from 'src/store/entities/task';
import { SkeletonList } from './SkeletonList';
import { TasksListSubtaskItem } from './TasksListSubtaskItem';

type Props = {
  subTaskIds: string[];
  taskId: string;
};

// TODO: Need to fix a Recoil warning, `Warning: Cannot update a component (`Batcher`)`.
// @see https://github.com/facebookexperimental/Recoil/issues/12
export const Container: React.FC<Props> = memo<Props>((props) => {
  const { subTaskIds, taskId } = props;
  const { loading } = useSubTasksQuery({
    where: {
      idIn: subTaskIds,
    },
  });
  const { taskIds } = useSubtaskIds(taskId);
  const { firstRender } = useFirstRender();

  // Perform a query on the first render to prevent loading when adding task.
  if (loading && firstRender) return <SkeletonList />;

  return (
    <>
      {taskIds.map((id) => (
        <TasksListSubtaskItem key={id} taskId={id} />
      ))}
    </>
  );
});

Container.displayName = 'Container';
