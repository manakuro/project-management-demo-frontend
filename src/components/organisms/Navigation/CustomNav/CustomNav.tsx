import React from 'react'
import { Box } from 'src/components/atoms'
import { MAX_WIDTH } from 'src/components/organisms/Navigation'
import { Favorites } from './Favorites'
import { Reports } from './Reports'

type Props = {
  isExpanded: boolean
}

export const CustomNav: React.VFC<Props> = (props) => {
  return (
    <Box overflow="scroll" w={MAX_WIDTH}>
      <Favorites isExpanded={props.isExpanded} />
      <Reports isExpanded={props.isExpanded} />
    </Box>
  )
}
