import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { TasksListItem } from 'src/components/features/organisms/Tasks/TasksList/TasksListItem';
import { TasksListSectionProvider } from 'src/components/features/organisms/Tasks/TasksList/TasksListSection';
import { Flex } from 'src/components/ui/atoms';
import { useMyTasksTaskIdsByProjectId } from 'src/store/app/myTasks/tasks';
import { Header } from './Header';
import { Provider } from './Provider';

type Props = {
  projectId: string;
};
export const TasksListSectionGroupByProject: React.FC<Props> = memo<Props>(
  (props) => {
    return (
      <Provider projectId={props.projectId}>
        <Component {...props} />
      </Provider>
    );
  },
);

const Component: React.FC<Props> = memo<Props>((props) => {
  const { taskIds } = useMyTasksTaskIdsByProjectId(props.projectId);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s);
  }, []);

  return (
    <>
      <Flex flex={1} flexDirection="column">
        <Header
          projectId={props.projectId}
          onToggle={handleToggle}
          isExpanded={isExpanded}
        />
        {isExpanded && (
          <Flex flexDirection="column">
            {taskIds.map((id) => (
              <TasksListSectionProvider taskSectionId="" key={id}>
                <TasksListItem taskId={id} />
              </TasksListSectionProvider>
            ))}
          </Flex>
        )}
      </Flex>
    </>
  );
});
Component.displayName = 'Component';
TasksListSectionGroupByProject.displayName = 'TasksListSectionGroupByProject';
