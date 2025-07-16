import type React from 'react'
import { memo } from 'react'
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar'
import { Flex, Text } from 'src/components/ui/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useTeammate } from 'src/store/entities/teammate'
import { PermissionMenu } from '../../PermissionMenu'

type Props = {
  projectId: string
  teammateId: string
}

export const MemberListItem: React.FC<Props> = memo<Props>((props) => {
  const { teammateId } = props
  const { teammate } = useTeammate(teammateId)
  const { clickableHoverStyle } = useClickableHoverStyle()

  return (
    <Flex
      alignItems="center"
      h="50px"
      px={6}
      {...clickableHoverStyle}
      cursor="default"
    >
      <TeammateAvatar teammateId={teammateId} size="sm" />
      <Flex flexDirection="column" ml={2} flex={1}>
        <Text fontWeight="medium" fontSize="xs">
          {teammate.name}
        </Text>
        <Text fontSize="xs" color="text.muted">
          {teammate.email}
        </Text>
      </Flex>
      <Flex>
        <PermissionMenu />
      </Flex>
    </Flex>
  )
})
MemberListItem.displayName = 'MemberListItem'
