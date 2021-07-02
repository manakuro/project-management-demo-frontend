import React, { memo } from 'react'
import { Icon } from 'src/components/atoms'
import { useTasksNameContext } from './TasksNameProvider'

type Props = {}

export const TasksNameGrabIcon: React.FC<Props> = memo<Props>(() => {
  const { showIcon } = useTasksNameContext()
  return (
    <Icon
      icon="gridVertical"
      color="text.muted"
      size="sm"
      visibility={showIcon ? 'visible' : 'hidden'}
      cursor="grab"
    />
  )
})
