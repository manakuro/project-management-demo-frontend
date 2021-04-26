import { Text } from 'src/components/atoms'
import React from 'react'

export const MentionText: React.FC = (props) => {
  return <Text as="span" color="cyan.400" cursor="pointer" {...props} />
}
