import React from 'react'
import { Flex, PortalManager } from 'src/components/atoms'
import {
  Popover,
  PopoverProps,
  PopoverTrigger,
} from 'src/components/organisms/Popover'
import { Content } from './Content'

type Props = PopoverProps & {
  onClose: () => void
  projectId: string
  teammateId: string
}

export const ProjectRoleInputPopover: React.FC<Props> = (props) => {
  const { children, isOpen, onClose, projectId, teammateId, ...rest } = props

  return (
    <PortalManager zIndex={1500}>
      <Popover
        isLazy
        placement="bottom-start"
        isOpen={isOpen}
        autoFocus
        {...rest}
      >
        <PopoverTrigger>
          <Flex>{children}</Flex>
        </PopoverTrigger>
        {isOpen && (
          <Content
            onClose={onClose}
            projectId={projectId}
            teammateId={teammateId}
          />
        )}
      </Popover>
    </PortalManager>
  )
}
