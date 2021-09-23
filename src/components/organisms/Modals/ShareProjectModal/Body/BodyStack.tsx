import React from 'react'
import { Stack, StackProps } from 'src/components/atoms'

type Props = StackProps

export const BodyStack: React.VFC<Props> = (props) => {
  return <Stack spacing={6} {...props} />
}
BodyStack.displayName = 'BodyStack'
