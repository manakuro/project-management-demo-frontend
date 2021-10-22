import React, { memo } from 'react'
import { MenuList as AtomsMenuList } from 'src/components/organisms/Menu'
import { AddRole } from './AddRole'
import { RemoveFromProject } from './RemoveFromProject'
import { SetProjectOwner } from './SetProjectOwner'

type Props = {
  projectId: string
  teammateId: string
  onOpenPopover: () => void
}

export const MenuList: React.FC<Props> = memo<Props>((props) => {
  const { projectId, teammateId, onOpenPopover } = props

  return (
    <AtomsMenuList>
      <AddRole
        projectId={projectId}
        teammateId={teammateId}
        onOpenPopover={onOpenPopover}
      />
      <SetProjectOwner projectId={projectId} teammateId={teammateId} />
      <RemoveFromProject projectId={projectId} teammateId={teammateId} />
    </AtomsMenuList>
  )
})
MenuList.displayName = 'MenuList'
