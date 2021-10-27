import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
} from '../OverviewSectionHeader'
import { Description } from './Description'

type Props = {}

export const DescriptionSection: React.VFC<Props> = memo<Props>(() => {
  return (
    <Flex flexDirection="column">
      <OverviewSectionHeader>
        <OverviewSectionHeaderHeading>Description</OverviewSectionHeaderHeading>
      </OverviewSectionHeader>
      <Description />
    </Flex>
  )
})
DescriptionSection.displayName = 'DescriptionSection'
