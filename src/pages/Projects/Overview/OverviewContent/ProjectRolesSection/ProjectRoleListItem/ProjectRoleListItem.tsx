import React from 'react'
import { Box, Button, Flex, Icon, Text } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useHover } from 'src/hooks/useHover'
import { useTeammate } from 'src/store/entities/teammates'

type Props = {
  teammateId: string
}

export const ProjectRoleListItem: React.FC<Props> = (props) => {
  const { teammate } = useTeammate(props.teammateId)
  const { ref, isHovering } = useHover()

  return (
    <Flex flexDirection="column" ref={ref}>
      <Button
        as={Box}
        variant="ghost"
        size="sm"
        border="1px"
        borderColor="transparent"
        cursor="pointer"
        px={2}
        h="56px"
      >
        <TeammateAvatar teammateId={teammate.id} size="sm" />
        <Flex
          flex={1}
          ml={2}
          flexDirection="column"
          justifyContent="center"
          minW="1px"
        >
          <Text fontSize="sm" fontWeight="medium" isTruncated>
            {teammate.name}
          </Text>
          <Text fontSize="xs" color="text.muted" mt={1}>
            Project Owner
          </Text>
        </Flex>
        {isHovering && (
          <Flex w={4} h="full" justifyContent="center" alignItems="center">
            <Icon icon="chevronDown" color="text.muted" />
          </Flex>
        )}
      </Button>
    </Flex>
  )
}
ProjectRoleListItem.displayName = 'ProjectRoleListItem'
