import React, { memo } from 'react'
import { useTasksTaskIdsByDueDate } from 'src/components/organisms/Tasks/hooks'
import { Stack } from 'src/components/ui/atoms'
import { ListItem } from './ListItem'

type Props = {
  dateString: string
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { dateString } = props
  const { taskIds } = useTasksTaskIdsByDueDate(dateString)

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
