import React from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'

type Props = FlexProps

export const OverviewSectionHeaderRight: React.FC<Props> = (props) => (
  <Flex ml="auto">{props.children}</Flex>
)

OverviewSectionHeaderRight.displayName = 'OverviewSectionHeaderRight'
