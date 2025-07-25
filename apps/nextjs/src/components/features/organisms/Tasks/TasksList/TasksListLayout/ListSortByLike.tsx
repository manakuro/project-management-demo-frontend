import type React from 'react';
import { memo } from 'react';
import { TasksListItem } from 'src/components/features/organisms/Tasks/TasksList/TasksListItem';
import { TasksListSectionProvider } from 'src/components/features/organisms/Tasks/TasksList/TasksListSection';
import { useTasksTaskIds } from 'src/components/features/organisms/Tasks/hooks';
import { Flex } from 'src/components/ui/atoms';

export const ListSortByLike: React.FC = memo(() => {
  const { taskIds } = useTasksTaskIds();
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {taskIds.map((id) => (
          <TasksListSectionProvider key={id} taskSectionId="">
            <TasksListItem taskId={id} />
          </TasksListSectionProvider>
        ))}
      </Flex>
    </Flex>
  );
});
ListSortByLike.displayName = 'ListSortByLike';
