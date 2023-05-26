import React from 'react'
import { Popover } from 'src/components/organisms/Popover'
import { PortalManager } from 'src/components/ui/atoms'

export const PopoverEditorLink: React.FCWithChildren = (props) => {
  return (
    <PortalManager zIndex={1500}>
      <Popover trigger="hover" isLazy placement="bottom-start" openDelay={500}>
        {props.children}
      </Popover>
    </PortalManager>
  )
}
