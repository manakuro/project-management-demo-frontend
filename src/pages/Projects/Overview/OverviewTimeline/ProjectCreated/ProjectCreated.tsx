import React, { memo, useMemo } from 'react'
import { Flex, Heading, Icon, Text } from 'src/components/atoms'
import { formatCreatedAt } from 'src/shared/date'
import { useProject } from 'src/store/entities/project'
import { useTeammate } from 'src/store/entities/teammate'

type Props = {
  projectId: string
}

export const ProjectCreated: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { project } = useProject(projectId)
  const { teammate } = useTeammate(project.createdBy)
  const name = useMemo(() => teammate.name, [teammate.name])

  return (
    <Flex position="relative">
      <Flex flexDirection="column">
        <Icon icon="outlineProject" color="text.muted" size="xl" ml="-1px" />
      </Flex>
      <Flex flexDirection="column" ml={2} mb={8}>
        <Heading as="h5" size="sm">
          Project created
        </Heading>
        <Flex mt={1}>
          <Text fontSize="xs" fontWeight="bold">
            {name}
          </Text>
          <Text ml={2} fontSize="xs" color="text.muted">
            {formatCreatedAt(project.createdAt)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
})
ProjectCreated.displayName = 'JoinedTeammate'
