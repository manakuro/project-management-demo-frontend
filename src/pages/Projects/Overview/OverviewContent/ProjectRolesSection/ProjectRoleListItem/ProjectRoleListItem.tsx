import React, { useMemo } from 'react'
import { Flex, Icon, Text } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useHover } from 'src/hooks/useHover'
import { useProjectTeammate } from 'src/store/entities/projectsTeammates'
import { useTeammate } from 'src/store/entities/teammates'
import { ProjectRoleMenu } from '../ProjectRoleMenu'
import { Button } from './Button'

type Props = {
  projectTeammateId: string
  projectId: string
}

export const ProjectRoleListItem: React.FC<Props> = (props) => {
  const { projectId, projectTeammateId } = props
  const { projectTeammate, role } = useProjectTeammate(projectTeammateId)
  const { teammate } = useTeammate(projectTeammate.teammateId)
  const { ref, isHovering } = useHover()

  const roleText = useMemo(() => {
    if (!role) return '+ Add role'
    return role
  }, [role])

  return (
    <Flex flexDirection="column" ref={ref} cursor="pointer">
      <ProjectRoleMenu
        projectId={projectId}
        projectTeammateId={projectTeammateId}
      >
        <Button>
          <Flex alignItems="center" textAlign="left">
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
                {roleText}
              </Text>
            </Flex>
            {isHovering && (
              <Flex
                ml="auto"
                w={4}
                h="full"
                justifyContent="center"
                alignItems="center"
              >
                <Icon icon="chevronDown" color="text.muted" />
              </Flex>
            )}
          </Flex>
        </Button>
      </ProjectRoleMenu>
    </Flex>
  )
}
ProjectRoleListItem.displayName = 'ProjectRoleListItem'
