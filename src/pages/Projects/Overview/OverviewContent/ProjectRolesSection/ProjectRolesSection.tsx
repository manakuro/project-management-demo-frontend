import React from 'react'
import { Flex, Grid } from 'src/components/atoms'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectTeammateIdsByProjectId } from 'src/store/entities/projectsTeammates'
import { OverviewContentHeading } from '../OverviewContentHeading'
import { ProjectRoleListItem } from './ProjectRoleListItem'

type Props = {}

export const ProjectRolesSection: React.FC<Props> = () => {
  const { projectId } = useProjectsProjectId()
  const { projectTeammateIds } = useProjectTeammateIdsByProjectId(projectId)

  return (
    <Flex flexDirection="column" mt={8}>
      <OverviewContentHeading>Project Roles</OverviewContentHeading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(181px, 1fr))"
        gap={2}
        mt={4}
      >
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
