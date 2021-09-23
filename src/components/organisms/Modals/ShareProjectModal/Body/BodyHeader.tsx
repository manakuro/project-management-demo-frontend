import React from 'react'
import { Heading, HeadingProps } from 'src/components/atoms'

type Props = HeadingProps

export const BodyHeader: React.VFC<Props> = (props) => {
  return <Heading as="h5" size="sm" {...props} />
}
BodyHeader.displayName = 'BodyHeader'
