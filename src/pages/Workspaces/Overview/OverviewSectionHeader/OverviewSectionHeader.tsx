import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = FlexProps

export const OverviewSectionHeader: React.FC<Props> = (props) => (
  <Flex py={2} borderBottom="2px" borderColor="gray.200" borderStyle="solid">
    {props.children}
  </Flex>
)

OverviewSectionHeader.displayName = 'OverviewSectionHeader'
