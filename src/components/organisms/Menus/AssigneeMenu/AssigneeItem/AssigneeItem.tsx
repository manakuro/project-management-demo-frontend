import React, { memo, useCallback } from 'react'
import { Avatar, FlexProps, Text } from 'src/components/atoms'
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

  return (
    <ListItem index={props.index} onClick={handleClick}>
      <LeftContainer>
        <Avatar
          name="Manato Kuroda"
          src="/images/cat_img.png"
          size="xs"
          cursor="pointer"
          bg="teal.200"
        />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm">mana</Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          d7108100@gmail.com
        </Text>
      </RightContainer>
    </ListItem>
  )
})
