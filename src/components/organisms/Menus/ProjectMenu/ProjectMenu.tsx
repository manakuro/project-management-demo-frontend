import React, { memo } from 'react'
import { PortalManager } from 'src/components/atoms'
import { Popover, PopoverProps, PopoverTrigger } from 'src/components/organisms'
import { Content } from './Content'

type Props = PopoverProps & {
  onClosed?: () => void
  queryText: string
}

export const ProjectMenu: React.FC<Props> = memo<Props>((props) => {
  const { onClosed, ...rest } = props

  return (
    <PortalManager zIndex={1500}>
      <Popover
        closeOnBlur={false}
        autoFocus={false}
        returnFocusOnClose={false}
        isLazy
        lazyBehavior="keepMounted"
        {...rest}
      >
        <PopoverTrigger>{props.children}</PopoverTrigger>
        <Content onClosed={onClosed} onClose={props.onClose} />
      </Popover>
    </PortalManager>
  )
})
