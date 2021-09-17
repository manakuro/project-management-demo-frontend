import React, { memo } from 'react'
import { Stack } from 'src/components/atoms'
import { useTasksTasksByDueDate } from 'src/components/organisms/Tasks/hooks'
import { ListItem } from './ListItem'

type Props = {
  dateString: string
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { dateString } = props
  const { taskIds } = useTasksTasksByDueDate(dateString)

  if (!taskIds.length) return null

  return (
    <Stack mt={2} spacing={2}>
      {taskIds.map((id) => (
        <ListItem key={id} taskId={id} />
      ))}
    </Stack>
  )
})
Content.displayName = 'Content'
