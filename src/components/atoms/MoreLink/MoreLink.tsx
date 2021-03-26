import React from 'react'
import { Text, TextProps } from 'src/components/atoms'

type Props = TextProps
export type MoreLinkProps = Props

export const MoreLink: React.FC<Props> = (props) => {
  return (
    <Text
      as="span"
      fontSize="xs"
      color="link"
      cursor="pointer"
      _hover={{
        textDecoration: 'underline !important',
      }}
      {...props}
    />
  )
}
