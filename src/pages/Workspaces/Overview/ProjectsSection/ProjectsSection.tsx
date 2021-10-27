import React, { memo, useState } from 'react'
import { Box, Flex, Grid } from 'src/components/atoms'
import {
  PROJECT_LIST_MENU_VIEW_AS_TILES,
  ProjectListItem,
  ProjectListItemNew,
  ProjectListMenu,
  ProjectListStatus,
  ProjectTileItem,
  ProjectTileItemNew,
} from 'src/components/organisms/Projects'
import { useProjectIds } from 'src/store/entities/projects'
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
  OverviewSectionHeaderRight,
} from '../OverviewSectionHeader'

type Props = {}

export const ProjectsSection: React.VFC<Props> = memo<Props>(() => {
  const { projectIds } = useProjectIds()
  const [listStatus, setListStatus] = useState<ProjectListStatus>(
    PROJECT_LIST_MENU_VIEW_AS_TILES,
  )

  return (
    <Flex flexDirection="column">
      <OverviewSectionHeader>
        <OverviewSectionHeaderHeading>Projects</OverviewSectionHeaderHeading>
        <OverviewSectionHeaderRight>
          <ProjectListMenu listStatus={listStatus} onChange={setListStatus} />
        </OverviewSectionHeaderRight>
      </OverviewSectionHeader>
      <Flex flexDirection="column">
        <>
          {listStatus === PROJECT_LIST_MENU_VIEW_AS_TILES ? (
            <Box py={4}>
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                <ProjectTileItemNew containerStyle={{ width: 'auto' }} />
                {projectIds.map((id) => (
                  <ProjectTileItem
                    projectId={id}
                    key={id}
                    containerStyle={{ width: 'auto' }}
                  />
                ))}
              </Grid>
            </Box>
          ) : (
            <>
              <ProjectListItemNew />
              {projectIds.map((id) => (
                <ProjectListItem projectId={id} key={id} />
              ))}
            </>
          )}
        </>
      </Flex>
    </Flex>
  )
})
ProjectsSection.displayName = 'DescriptionSection'
