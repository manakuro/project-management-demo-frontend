import React from 'react'
import { Popover } from 'src/components/organisms'
import { PortalManager } from '@chakra-ui/react'

export const PopoverEditorLink: React.FC = (props) => {
  return (
    <PortalManager zIndex={1500}>
      <Popover trigger="hover" isLazy placement="bottom-start" openDelay={500}>
        {props.children}
      </Popover>
    </PortalManager>
  )
}
