import React, { memo, useCallback } from 'react'
import { Flex, AvatarGroup } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useTooltip } from 'src/components/molecules/Tooltip/useTooltip'
import { useShareProjectModal } from 'src/components/organisms/Modals/ShareProjectModal'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useTeammateIdsByProjectId } from 'src/store/entities/projectsTeammates'
import { useWorkspace } from 'src/store/entities/workspace'
import { transitions } from 'src/styles'

type Props = {}

export const ProjectTeammates: React.VFC<Props> = memo<Props>(() => {
  const { projectId } = useProjectsProjectId()
  const { teammateIds } = useTeammateIdsByProjectId(projectId)
  const { isOpen, ref } = useTooltip()
  const { onOpen, setProjectId, setMembersTab } = useShareProjectModal()
  const { workspace } = useWorkspace()

  const handleClick = useCallback(() => {
    setProjectId(projectId)
    setMembersTab()
    onOpen()
  }, [setProjectId, projectId, setMembersTab, onOpen])

  return (
    <Flex alignItems="center">
      <Tooltip
        isOpen={isOpen}
        hasArrow
        label={`Members of this ${workspace.name} team can find this project`}
        aria-label="A share button description"
        size="md"
      >
        <AvatarGroup
          ref={ref}
          size="xs"
          max={3}
          fontSize="xs"
          cursor="pointer"
          spacing={-1}
          opacity={0.8}
          transition={transitions.base()}
          _hover={{ opacity: 1 }}
          onClick={handleClick}
        >
          {teammateIds.map((id) => (
            <TeammateAvatar teammateId={id} key={id} showProfile={false} />
          ))}
        </AvatarGroup>
      </Tooltip>
    </Flex>
  )
})
ProjectTeammates.displayName = 'ProjectTeammates'
