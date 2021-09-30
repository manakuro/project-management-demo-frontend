import React, { memo, useCallback } from 'react'
import { Text } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { Teammate } from 'src/store/entities/teammates'
import {
  ProjectTeammateMenuListItem,
  ProjectTeammateMenuLeftContainer,
  ProjectTeammateMenuRightContainer,
} from '../ProjectTeammateMenuListItem'

type Props = {
  onClick: (teammate: Teammate) => void
  teammate: Teammate
  index: number
}

export const ProjectTeammateMenuItem: React.FC<Props> = memo<Props>((props) => {
  const { teammate, onClick } = props

  const handleClick = useCallback(() => {
    onClick(teammate)
  }, [onClick, teammate])

  return (
    <ProjectTeammateMenuListItem index={props.index} onClick={handleClick}>
      <ProjectTeammateMenuLeftContainer>
        <TeammateAvatar teammateId={teammate.id} size="xs" />
      </ProjectTeammateMenuLeftContainer>
      <ProjectTeammateMenuRightContainer>
        <Text fontSize="sm">{teammate.name}</Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {teammate.email}
        </Text>
      </ProjectTeammateMenuRightContainer>
    </ProjectTeammateMenuListItem>
  )
})
ProjectTeammateMenuItem.displayName = 'ProjectTeammateMenuItem'
