import React, { memo } from 'react'
import { Icon, IconProps } from 'src/components/ui/atoms'
import { useSubtasksNameContext } from './Provider'

type Props = Omit<IconProps, 'icon'>

export const TasksNameGrabIcon: React.FC<Props> = memo<Props>((props) => {
  const { showIcon } = useSubtasksNameContext()
  return (
    <Icon
      icon="gridVertical"
      color="text.muted"
      size="sm"
      visibility={showIcon ? 'visible' : 'hidden'}
      cursor="grab"
      {...props}
    />
  )
})
TasksNameGrabIcon.displayName = 'TasksNameGrabIcon'
