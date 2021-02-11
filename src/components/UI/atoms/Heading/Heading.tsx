import React from 'react'
import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react'

type Props = HeadingProps

export const Heading: React.FC<Props> = (props) => {
  return <ChakraHeading {...props} fontFamily="Poppins" lineHeight={1.5} />
}
