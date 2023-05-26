import React, { memo } from 'react'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { Flex, Text } from 'src/components/ui/atoms'
import { useTeammate } from 'src/store/entities/teammate'

type Props = {
  teammateId: string
}

export const MemberListItem: React.FC<Props> = memo<Props>((props) => {
  const { teammateId } = props
  const { teammate } = useTeammate(teammateId)
  return (
    <Flex flex={1} py={3} alignItems="center">
      <TeammateAvatar teammateId={teammate.id} size="sm" />
      <Flex
        ml={3}
        flexDirection="column"
        minW="1px"
        flex={1}
        justifyContent="center"
      >
        <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
          {teammate.name}
        </Text>
        <Text fontSize="xs" color="text.muted">
          {teammate.email}
        </Text>
      </Flex>
    </Flex>
  )
})
MemberListItem.displayName = 'MemberListItem'
