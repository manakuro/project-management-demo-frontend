import React, { memo } from 'react'
import { MenuList as AtomsMenuList } from 'src/components/organisms/Menu'
import { AddRole } from './AddRole'
import { RemoveFromProject } from './RemoveFromProject'
import { SetProjectOwner } from './SetProjectOwner'

type Props = {
  projectId: string
  teammateId: string
}

export const MenuList: React.FC<Props> = memo<Props>((props) => {
  const { projectId, teammateId } = props

  return (
    <AtomsMenuList>
      <AddRole projectId={projectId} teammateId={teammateId} />
      <SetProjectOwner projectId={projectId} teammateId={teammateId} />
      <RemoveFromProject projectId={projectId} teammateId={teammateId} />
    </AtomsMenuList>
  )
})
MenuList.displayName = 'MenuList'
