import { Text, TextProps } from 'src/components/atoms'
import React from 'react'

type Props = TextProps

export const MentionText: React.FC<Props> = (props) => {
  return (
    <Text
      as="span"
      color="cyan.400"
      cursor="pointer"
      fontSize="sm"
      _hover={{
        textDecoration: 'underline !important',
      }}
      {...props}
    />
  )
}
