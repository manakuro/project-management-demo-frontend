import React, { memo, useCallback } from 'react'
import { Text } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { Teammate } from 'src/store/entities/teammates'
import { ListItem, LeftContainer, RightContainer } from '../ListItem'

type Props = {
  onClick: (teammate: Teammate) => void
  teammate: Teammate
  index: number
}

export const ProjectTeammateItem: React.FC<Props> = memo<Props>((props) => {
  const { teammate, onClick } = props

  const handleClick = useCallback(() => {
    onClick(teammate)
  }, [onClick, teammate])

  return (
    <ListItem index={props.index} onClick={handleClick}>
      <LeftContainer>
        <TeammateAvatar teammateId={teammate.id} size="xs" />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm">{teammate.name}</Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {teammate.email}
        </Text>
      </RightContainer>
    </ListItem>
  )
})
ProjectTeammateItem.displayName = 'ProjectTeammateItem'
