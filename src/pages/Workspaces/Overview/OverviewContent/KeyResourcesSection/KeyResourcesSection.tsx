import React from 'react'
import { Flex } from 'src/components/atoms'
import { OverviewContentHeading } from '../OverviewContentHeading'
import { KeyResourcesEmpty } from './KeyResourcesEmpty'

type Props = {}

export const KeyResourcesSection: React.FC<Props> = () => {
  return (
    <Flex flexDirection="column" mt={8}>
      <OverviewContentHeading>Key resources</OverviewContentHeading>
      <KeyResourcesEmpty />
    </Flex>
  )
}
KeyResourcesSection.displayName = 'KeyResourcesSection'
