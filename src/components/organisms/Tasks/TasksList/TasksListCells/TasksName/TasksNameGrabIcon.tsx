import React, { memo } from 'react'
import { Icon } from 'src/components/atoms'

type Props = {
  show: boolean
}

export const TasksNameGrabIcon: React.FC<Props> = memo<Props>((props) => {
  return (
    <Icon
      icon="gridVertical"
      color="text.muted"
      size="sm"
      visibility={props.show ? 'visible' : 'hidden'}
      cursor="grab"
    />
  )
})
