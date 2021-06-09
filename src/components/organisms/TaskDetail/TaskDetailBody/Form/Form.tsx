import React, { memo } from 'react'
import { Flex, Stack } from 'src/components/atoms'
import { useTasksListDetail } from 'src/components/organisms'
import { dateFns } from 'src/shared/dateFns'
import { Assignee } from './Assignee'
import { Attachment } from './Attachment'
import { Description } from './Description'
import { DueDate } from './DueDate'
import { FeedList } from './FeedList'
import { Projects } from './Projects'
import { Subtasks } from './Subtasks'
import { TaskName } from './TaskName'

type Props = {}

export const Form: React.FC<Props> = memo(() => {
  const { taskId } = useTasksListDetail()

  return (
    <Flex flexDirection="column" pt={2}>
      <TaskName taskId={taskId} />
      <Stack px={6} mt={3}>
        <Assignee />
        <DueDate
          dueDate={new Date(dateFns.addDays(new Date(), 3)).toISOString()}
          dueTime={new Date(dateFns.addDays(new Date(), 3)).toISOString()}
        />
        <Projects />
        <Description />
        <Subtasks taskId={taskId} />
        <Attachment taskId={taskId} />
      </Stack>
      <FeedList taskId={taskId} />
    </Flex>
  )
})
Form.displayName = 'Form'
