import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react'
import React from 'react'

type Props = HeadingProps

export const Heading: React.FC<Props> = (props) => {
  return <ChakraHeading {...props} lineHeight={1.5} />
}
