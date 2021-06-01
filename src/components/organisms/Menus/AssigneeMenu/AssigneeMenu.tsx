import React, { memo } from 'react'
import { PortalManager } from 'src/components/atoms'
import { Popover, PopoverProps, PopoverTrigger } from 'src/components/organisms'
import { Content } from './Content'

type Props = PopoverProps & {
  onClosed?: () => void
}

export const AssigneeMenu: React.FC<Props> = memo<Props>((props) => {
  const { onClosed, ...rest } = props
  return (
    <PortalManager zIndex={1500}>
      <Popover
        defaultIsOpen={props.defaultIsOpen}
        isOpen={props.isOpen}
        placement="bottom-end"
        closeOnBlur={false}
        trigger={props.trigger}
        autoFocus={false}
        returnFocusOnClose={false}
        isLazy
        lazyBehavior="keepMounted"
        {...rest}
      >
        <PopoverTrigger>{props.children}</PopoverTrigger>
        <Content onClosed={onClosed} />
      </Popover>
    </PortalManager>
  )
})
