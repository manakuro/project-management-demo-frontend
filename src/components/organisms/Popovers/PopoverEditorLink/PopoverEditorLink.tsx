import React from 'react'
import { PortalManager } from 'src/components/atoms'
import { Popover } from 'src/components/organisms/Popover'

export const PopoverEditorLink: React.FC = (props) => {
  return (
    <PortalManager zIndex={1500}>
      <Popover trigger="hover" isLazy placement="bottom-start" openDelay={500}>
        {props.children}
      </Popover>
    </PortalManager>
  )
}
