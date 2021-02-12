import React from 'react'
import { Box } from 'src/components/UI/atoms'
import { MAX_WIDTH } from '../Navigation'
import { Favorites } from './Favorites'
import { Reports } from './Reports'

type Props = {
  isExpanded: boolean
}

export const Main: React.VFC<Props> = (props) => {
  return (
    <Box overflow="scroll" flex={1} w={MAX_WIDTH}>
      <Favorites isExpanded={props.isExpanded} />
      <Reports isExpanded={props.isExpanded} />
    </Box>
  )
}
