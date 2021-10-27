import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = FlexProps

export const OverviewSectionHeaderRight: React.FC<Props> = (props) => (
  <Flex flex={1} ml="auto">
    {props.children}
  </Flex>
)

OverviewSectionHeaderRight.displayName = 'OverviewSectionHeaderRight'
