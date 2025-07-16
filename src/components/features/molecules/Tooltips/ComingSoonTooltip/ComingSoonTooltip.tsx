import type { PropsWithChildren } from 'react'
import { Tooltip } from 'src/components/ui/molecules'

export function ComingSoonTooltip(props: PropsWithChildren) {
  return (
    <Tooltip
      hasArrow
      label={'This feature has not been implemented yet.\n Coming soon.'}
      aria-label="This feature has not been implemented yet. Coming soon!"
      size="md"
      withIcon
    >
      {props.children}
    </Tooltip>
  )
}
