import React, { memo } from 'react'
import { useTasksContext } from 'src/components/organisms/Tasks'
import { FlexProps } from 'src/components/ui/atoms'
import { ListItemForMyTasksPage } from './ListItemForMyTasksPage'
import { ListItemForProjectsPage } from './ListItemForProjectsPage'

type Props = {
  taskId: string
} & FlexProps

export const ListItem: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { isMyTasksPage } = useTasksContext()

  if (isMyTasksPage) {
    return <ListItemForMyTasksPage taskId={taskId} />
  }

  return <ListItemForProjectsPage taskId={taskId} />
})
ListItem.displayName = 'ListItem'
