import React, { memo, useCallback } from 'react'
import { Text } from 'src/components/atoms'
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuRightContainer,
} from 'src/components/organisms/Menus/SearchMenu'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { Teammate } from 'src/store/entities/teammates'

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
    <SearchMenuListItem index={props.index} onClick={handleClick}>
      <SearchMenuLeftContainer>
        <TeammateAvatar teammateId={teammate.id} size="xs" />
      </SearchMenuLeftContainer>
      <SearchMenuRightContainer>
        <Text fontSize="sm">{teammate.name}</Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {teammate.email}
        </Text>
      </SearchMenuRightContainer>
    </SearchMenuListItem>
  )
})
ProjectTeammateMenuItem.displayName = 'ProjectTeammateMenuItem'
