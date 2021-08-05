import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { Card } from './Card'
import { DueDate } from './DueDate'
import { Feed } from './Feed'
import { Like } from './Like'
import { MoreAction } from './MoreAction'
import { Projects } from './Projects'
import { Provider } from './Provider'
import { Subtask } from './Subtask'
import { TasksName } from './TasksName'
import { useTasksBoardListItemElement } from './useTasksBoardListItemElement'

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
  const { className, generateId } = useTasksBoardListItemElement()
  return (
    <Card
      taskId={props.taskId}
      className={className}
      id={generateId(props.taskId)}
    >
      {/*cover image here*/}
      <Projects taskId={props.taskId} />
      <TasksName taskId={props.taskId} />
      <Flex mt={4} alignItems="center">
        <DueDate taskId={props.taskId} />
        <Flex ml="auto">
          <Like taskId={props.taskId} />
          <Feed taskId={props.taskId} />
          <Subtask taskId={props.taskId} />
        </Flex>
      </Flex>
      <MoreAction taskId={props.taskId} />
    </Card>
  )
})
TasksBoardListItem.displayName = 'TasksBoardListItem'
