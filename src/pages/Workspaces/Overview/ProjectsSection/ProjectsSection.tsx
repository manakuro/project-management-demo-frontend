import React, { memo, useState } from 'react'
import { Box, Flex, Grid, Link, NextLink } from 'src/components/atoms'
import {
  PROJECT_LIST_MENU_VIEW_AS_TILES,
  ProjectListItem,
  ProjectListItemNew,
  ProjectListMenu,
  ProjectListStatus,
  ProjectTileItem,
  ProjectTileItemNew,
} from 'src/components/organisms/Projects'
import { ROUTE_PROJECTS_LIST } from 'src/router'
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
                  <NextLink
                    href={ROUTE_PROJECTS_LIST.href.pathnameObj(id)}
                    key={id}
                    passHref
                  >
                    <Link>
                      <ProjectTileItem
                        projectId={id}
                        containerStyle={{ width: 'auto' }}
                      />
                    </Link>
                  </NextLink>
                ))}
              </Grid>
            </Box>
          ) : (
            <>
              <ProjectListItemNew />
              {projectIds.map((id) => (
                <NextLink
                  href={ROUTE_PROJECTS_LIST.href.pathnameObj(id)}
                  key={id}
                  passHref
                >
                  <Link>
                    <ProjectListItem projectId={id} />
                  </Link>
                </NextLink>
              ))}
            </>
          )}
        </>
      </Flex>
    </Flex>
  )
})
ProjectsSection.displayName = 'DescriptionSection'
