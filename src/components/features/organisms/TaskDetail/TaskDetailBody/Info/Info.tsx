import type React from 'react'
import { memo } from 'react'
import { useIsTaskDeleted } from 'src/store/entities/task'
import { DeletedTask } from './DeletedTask'
import { MakePublic } from './MakePublic'

type Props = {
  taskId: string
}

export const Info: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { isTaskDeleted } = useIsTaskDeleted(taskId)

  if (isTaskDeleted) {
    return <DeletedTask taskId={taskId} />
  }

  return <MakePublic />
})
Info.displayName = 'Info'
