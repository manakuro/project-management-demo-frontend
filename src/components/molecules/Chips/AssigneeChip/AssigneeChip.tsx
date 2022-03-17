import React, { memo, useCallback } from 'react'
import { Avatar, Box, Button, Icon, Text } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms/Popovers'
import { useClickableHoverStyle } from 'src/hooks'
import { useTeammate } from 'src/store/entities/teammate'

type Props = {
  teammateId: string
  onDelete?: (teammateId: string) => void
}

export const AssigneeChip: React.VFC<Props> = memo((props) => {
  const { teammateId, onDelete } = props
  const { teammate } = useTeammate(teammateId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      onDelete?.(teammateId)
    },
    [onDelete, teammateId],
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
AssigneeChip.displayName = 'AssigneeChip'
