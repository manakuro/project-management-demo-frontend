import type React from 'react'
import { PortalManager } from 'src/components/ui/atoms'
import { Popover } from 'src/components/ui/organisms/Popover'

export const PopoverEditorLink: React.FCWithChildren = (props) => {
  return (
    <PortalManager zIndex={1500}>
      <Popover trigger="hover" isLazy placement="bottom-start" openDelay={500}>
        {props.children}
      </Popover>
    </PortalManager>
  )
}
