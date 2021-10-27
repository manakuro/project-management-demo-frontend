import React from 'react'
import { FlexProps, Heading } from 'src/components/atoms'

type Props = FlexProps

export const OverviewSectionHeaderHeading: React.FC<Props> = (props) => (
  <Heading as="h3" size="sm">
    {props.children}
  </Heading>
)

OverviewSectionHeaderHeading.displayName = 'OverviewSectionHeaderHeading'
