import React, { memo, useCallback } from 'react'
import { Avatar, Box, Button, Icon, Text } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useTeammate } from 'src/store/teammates'
import { PopoverProfile } from 'src/components/organisms'

type Props = {
  teammateId: string
  onDelete?: () => void
}

export const AssigneeChip: React.VFC<Props> = memo((props) => {
  const { teammateId } = props
  const { teammate } = useTeammate(teammateId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      props.onDelete?.()
    },
    [props],
  )

  return (
    <PopoverProfile
      profile={{
        name: teammate.name,
        image: teammate.image,
        email: teammate.email,
      }}
    >
      <Button
        as={Box}
        size="sm"
        border="1px"
        borderColor="transparent"
        cursor="pointer"
        borderRadius="full"
      >
        <Avatar
          name={teammate.name}
          src={teammate.image}
          size="xs"
          cursor="pointer"
          bg="teal.200"
        />
        <Text ml={2} fontSize="sm">
          {teammate.name}
        </Text>
        <Icon
          ml={2}
          mt="1px"
          icon="x"
          color="text.muted"
          size="sm"
          {...clickableHoverLightStyle}
          onClick={handleDelete}
        />
      </Button>
    </PopoverProfile>
  )
})
