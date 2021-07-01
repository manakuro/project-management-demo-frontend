import React, { memo, useCallback, useState } from 'react'
import { Flex } from 'src/components/atoms'
import { TasksListItem } from 'src/components/organisms/Tasks/TasksList/TasksListItem'
import { useMyTasksTaskIdsByProject } from 'src/store/app/myTasks/projects'
import { Header } from './Header'
import { Provider } from './Provider'

type Props = {
  projectId: string
}
export const TasksListSectionGroupByProject: React.FC<Props> = memo<Props>(
  (props) => {
    return (
      <Provider projectId={props.projectId}>
        <Component {...props} />
      </Provider>
    )
  },
)

const Component: React.FC<Props> = memo<Props>((props) => {
  const { taskIds } = useMyTasksTaskIdsByProject(props.projectId)
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s)
  }, [])

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
              <TasksListItem taskId={id} key={id} />
            ))}
          </Flex>
        )}
      </Flex>
    </>
  )
})
TasksListSectionGroupByProject.displayName = 'TasksListSectionGroupByProject'
