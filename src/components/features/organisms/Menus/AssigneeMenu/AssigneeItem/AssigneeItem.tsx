import React, { memo, useCallback } from 'react'
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar'
import { FlexProps, Text } from 'src/components/ui/atoms'
import { useTeammate } from 'src/store/entities/teammate'
import { ListItem, RightContainer, LeftContainer } from '../ListItem'

type Props = Override<
  FlexProps,
  {
    onClick: (val: any) => void
  }
> & {
  assignee: any
  index: number
}

export const AssigneeItem: React.FC<Props> = memo<Props>((props) => {
  const handleClick = useCallback(() => {
    props.onClick(props.assignee)
  }, [props])
  const { teammate } = useTeammate('1')

  return (
    <ListItem index={props.index} onClick={handleClick}>
      <LeftContainer>
        <TeammateAvatar teammateId={teammate.id} size="xs" />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm">mana</Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {teammate.email}
        </Text>
      </RightContainer>
    </ListItem>
  )
})
AssigneeItem.displayName = 'AssigneeItem'
