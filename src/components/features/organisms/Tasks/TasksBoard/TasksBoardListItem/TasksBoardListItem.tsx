import type React from 'react'
import { memo } from 'react'
import { useTasksContext } from 'src/components/features/organisms/Tasks'
import type { FlexProps } from 'src/components/ui/atoms'
import { Provider } from './Provider'
import { TasksBoardListItemForMyTasksPage } from './TasksBoardListItemForMyTasksPage'
import { TasksBoardListItemForProjectsPage } from './TasksBoardListItemForProjectsPage'

type Props = FlexProps & {
  taskId: string
}

export const TasksBoardListItem: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>((props) => {
  const { isMyTasksPage } = useTasksContext()

  if (isMyTasksPage) return <TasksBoardListItemForMyTasksPage {...props} />

  return <TasksBoardListItemForProjectsPage {...props} />
})
Component.displayName = 'Component'
TasksBoardListItem.displayName = 'TasksBoardListItem'
