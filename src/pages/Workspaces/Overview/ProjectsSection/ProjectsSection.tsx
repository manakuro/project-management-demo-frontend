import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useProjectIds } from 'src/store/entities/projects'
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
  OverviewSectionHeaderRight,
} from '../OverviewSectionHeader'

type Props = {}

export const ProjectsSection: React.VFC<Props> = memo<Props>(() => {
  const { projectIds } = useProjectIds()

  return (
    <Flex flexDirection="column">
      <OverviewSectionHeader>
        <OverviewSectionHeaderHeading>Projects</OverviewSectionHeaderHeading>
        <OverviewSectionHeaderRight></OverviewSectionHeaderRight>
      </OverviewSectionHeader>
      <Flex flexDirection="column">
        {projectIds.map((id) => (
          <>{id}</>
        ))}
      </Flex>
    </Flex>
  )
})
ProjectsSection.displayName = 'DescriptionSection'
