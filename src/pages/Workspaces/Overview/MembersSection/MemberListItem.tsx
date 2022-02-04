import React, { memo } from 'react'
import { Flex, Text } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useTeammate } from 'src/store/entities/teammate'

type Props = {
  teammateId: string
}

export const MemberListItem: React.VFC<Props> = memo<Props>((props) => {
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
        <Text fontSize="sm" fontWeight="medium" isTruncated>
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
