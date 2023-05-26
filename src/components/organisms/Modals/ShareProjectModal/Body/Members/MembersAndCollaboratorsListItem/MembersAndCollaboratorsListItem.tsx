import React, { memo } from 'react'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { Flex, Text } from 'src/components/ui/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useWorkspace } from 'src/store/entities/workspace'
import { PermissionMenu } from '../../PermissionMenu'

type Props = {
  projectId: string
}

export const MembersAndCollaboratorsListItem: React.FC<Props> = memo<Props>(
  () => {
    const { clickableHoverStyle } = useClickableHoverStyle()
    const { workspace } = useWorkspace()

    return (
      <Flex
        alignItems="center"
        h="50px"
        px={6}
        {...clickableHoverStyle}
        cursor="default"
      >
        <TeammateAvatar teammateId="" size="sm" />
        <Flex flexDirection="column" ml={2} flex={1}>
          <Text fontWeight="medium" fontSize="xs">
            {`Members of ${workspace.name} and task collaborators`}
          </Text>
        </Flex>
        <Flex>
          <PermissionMenu />
        </Flex>
      </Flex>
    )
  },
)
MembersAndCollaboratorsListItem.displayName = 'MembersAndCollaboratorsListItem'
