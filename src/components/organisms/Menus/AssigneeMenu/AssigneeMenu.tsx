import React, { memo } from 'react'
import { PortalManager } from 'src/components/atoms'
import { Popover, PopoverTrigger } from 'src/components/organisms'
import { Content } from './Content'

type Props = {}

export const AssigneeMenu: React.FC<Props> = memo<Props>((props) => {
  return (
    <PortalManager zIndex={1500}>
      <Popover defaultIsOpen placement="bottom-end" closeOnBlur={false} isLazy>
        <PopoverTrigger>{props.children}</PopoverTrigger>
        <Content />
      </Popover>
    </PortalManager>
  )
})
