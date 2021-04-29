import React, { memo } from 'react'
import { Icon } from 'src/components/atoms'
import { useTasksName } from './TasksNameProvider'

type Props = {}

export const TasksNameGrabIcon: React.FC<Props> = memo<Props>(() => {
  const { showIcon } = useTasksName()
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
