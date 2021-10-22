import React, { useRef } from 'react'
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
  projectTeammateId: string
  isOpen: boolean
}

export const ProjectRoleInputPopover: React.FC<Props> = (props) => {
  const { children, isOpen, onClose, projectId, projectTeammateId, ...rest } =
    props
  const initialFocusRef = useRef<HTMLInputElement | null>(null)

  return (
    <PortalManager zIndex={1500}>
      <Popover
        isLazy
        placement="bottom-start"
        isOpen={isOpen}
        initialFocusRef={initialFocusRef}
        {...rest}
      >
        <PopoverTrigger>
          <Flex>{children}</Flex>
        </PopoverTrigger>
        {isOpen && (
          <Content
            isOpen={isOpen}
            onClose={onClose}
            projectId={projectId}
            projectTeammateId={projectTeammateId}
            initialFocusRef={initialFocusRef}
          />
        )}
      </Popover>
    </PortalManager>
  )
}
