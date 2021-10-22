import React from 'react'
import { Tooltip } from 'src/components/molecules'

type Props = {}

export const ComingSoonTooltip: React.FC<Props> = (props) => {
  return (
    <Tooltip
      hasArrow
      label={'This feature has not been implemented yet.\n Coming soon.'}
      aria-label="This feature has not been implemented yet. Coming soon!"
      size="md"
    >
      {props.children}
    </Tooltip>
  )
}
ComingSoonTooltip.displayName = 'ComingSoonTooltip'
