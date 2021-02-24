import React from 'react'
import { Divider, Box, Heading } from 'src/components/atoms'

type Props = {
  title: string
}

export const Section: React.FC<Props> = (props) => {
  return (
    <Box mt={4}>
      <Divider />
      <Heading as="h4" size="sm" my={4}>
        {props.title}
      </Heading>
      <Box>{props.children}</Box>
    </Box>
  )
}
