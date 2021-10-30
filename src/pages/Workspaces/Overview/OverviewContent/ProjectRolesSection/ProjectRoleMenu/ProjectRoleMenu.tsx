import React, { memo } from 'react'
import { Box, PortalManager } from 'src/components/atoms'
import { Menu } from 'src/components/organisms/Menu'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'
import { ProjectRoleInputPopover } from './ProjectRoleInputPopover'

type Props = {
  projectId: string
  projectTeammateId: string
}

export const ProjectRoleMenu: React.FC<Props> = memo<Props>((props) => {
  const disclosurePopover = useDisclosure()

  return (
    <ProjectRoleInputPopover
      isOpen={disclosurePopover.isOpen}
      onClose={disclosurePopover.onClose}
      projectId={props.projectId}
      projectTeammateId={props.projectTeammateId}
    >
      <PortalManager zIndex={1500}>
        <Box w="full">
          <Menu placement="bottom-start" isLazy>
            {props.children}
            <MenuList
              projectId={props.projectId}
              projectTeammateId={props.projectTeammateId}
              onOpenPopover={disclosurePopover.onOpen}
            />
          </Menu>
        </Box>
      </PortalManager>
    </ProjectRoleInputPopover>
  )
})
ProjectRoleMenu.displayName = 'ProjectRoleMenu'