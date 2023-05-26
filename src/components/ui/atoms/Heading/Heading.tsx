import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraHeadingProps
export type HeadingProps = Props

export const Heading: React.FC<Props> = (props) => {
  return <ChakraHeading {...props} lineHeight={1.5} />
}