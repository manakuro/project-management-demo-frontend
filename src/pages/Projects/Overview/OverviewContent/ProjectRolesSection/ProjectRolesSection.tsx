import React from 'react'
import { Flex, Grid } from 'src/components/atoms'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useTeammateIdsByProjectId } from 'src/store/entities/projectsTeammates'
import { OverviewContentHeading } from '../OverviewContentHeading'
import { ProjectRoleListItem } from './ProjectRoleListItem'

type Props = {}

export const ProjectRolesSection: React.FC<Props> = () => {
  const { projectId } = useProjectsProjectId()
  const { teammateIds } = useTeammateIdsByProjectId(projectId)

  return (
    <Flex flexDirection="column" mt={8}>
      <OverviewContentHeading>Project Roles</OverviewContentHeading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(181px, 1fr))"
        gap={2}
        mt={4}
      >
        {teammateIds.map((id) => (
          <ProjectRoleListItem teammateId={id} key={id} />
        ))}
      </Grid>
    </Flex>
  )
}
ProjectRolesSection.displayName = 'ProjectRolesSection'
