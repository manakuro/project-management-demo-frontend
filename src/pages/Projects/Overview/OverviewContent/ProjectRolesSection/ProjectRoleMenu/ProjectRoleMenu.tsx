import React, { memo } from 'react'
import { Box, PortalManager } from 'src/components/atoms'
import { Menu } from 'src/components/organisms/Menu'
import { MenuList } from './MenuList'

type Props = {
  projectId: string
  teammateId: string
}

export const ProjectRoleMenu: React.FC<Props> = memo<Props>((props) => {
  return (
    <PortalManager zIndex={1500}>
      <Box>
        <Menu placement="bottom-start" isLazy>
          {props.children}
          <MenuList projectId={props.projectId} teammateId={props.teammateId} />
        </Menu>
      </Box>
    </PortalManager>
  )
})
ProjectRoleMenu.displayName = 'ProjectRoleMenu'
