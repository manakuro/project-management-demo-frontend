import React from 'react'
import { Heading, HeadingProps } from 'src/components/ui/atoms'

type Props = HeadingProps

export const BodyHeader: React.FC<Props> = (props) => {
  return <Heading as="h5" size="sm" {...props} />
}
BodyHeader.displayName = 'BodyHeader'
