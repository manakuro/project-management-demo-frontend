import React from 'react'
import { Flex, Grid } from 'src/components/atoms'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectTeammateIdsByProjectIdSortedByOwner } from 'src/store/entities/projectsTeammates'
import { OverviewContentHeading } from '../OverviewContentHeading'
import { ProjectRoleAddMember } from './ProjectRoleAddMember'
import { ProjectRoleListItem } from './ProjectRoleListItem'

type Props = {}

export const ProjectRolesSection: React.FC<Props> = () => {
  const { projectId } = useProjectsProjectId()
  const { projectTeammateIds } =
    useProjectTeammateIdsByProjectIdSortedByOwner(projectId)

  return (
    <Flex flexDirection="column" mt={8}>
      <OverviewContentHeading>Project Roles</OverviewContentHeading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(181px, 1fr))"
        gap={2}
        mt={4}
      >
        <ProjectRoleAddMember projectId={projectId} />
        {projectTeammateIds.map((id) => (
          <ProjectRoleListItem
            projectTeammateId={id}
            key={id}
            projectId={projectId}
          />
        ))}
      </Grid>
    </Flex>
  )
}
ProjectRolesSection.displayName = 'ProjectRolesSection'
