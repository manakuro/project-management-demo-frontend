import React from 'react'
import { Stack, StackProps } from 'src/components/ui/atoms'

type Props = StackProps

export const BodyStack: React.FC<Props> = (props) => {
  return <Stack spacing={6} {...props} />
}
BodyStack.displayName = 'BodyStack'
