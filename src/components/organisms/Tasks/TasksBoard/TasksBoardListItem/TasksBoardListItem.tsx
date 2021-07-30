import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { Card } from './Card'
import { DueDate } from './DueDate'
import { Projects } from './Projects'
import { Provider } from './Provider'
import { TasksName } from './TasksName'

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
  return (
    <Card>
      {/*cover image here*/}
      <Projects taskId={props.taskId} />
      <TasksName taskId={props.taskId} />
      <Flex mt={4}>
        <DueDate taskId={props.taskId} />
      </Flex>
    </Card>
  )
})
TasksBoardListItem.displayName = 'TasksBoardListItem'
