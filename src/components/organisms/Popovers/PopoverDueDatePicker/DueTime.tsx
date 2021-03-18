import React from 'react'
import { Icon, IconBg } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

type Props = {}

export const DueTime: React.FC<Props> = (props) => {
  return (
    <Tooltip
      hasArrow
      color="white"
      bg="gray.800"
      label="Add due time"
      aria-label="A due time description"
      size="sm"
      fontSize="xs"
    >
      <IconBg>
        <Icon icon="time" color="text.muted" />
      </IconBg>
    </Tooltip>
  )
}
