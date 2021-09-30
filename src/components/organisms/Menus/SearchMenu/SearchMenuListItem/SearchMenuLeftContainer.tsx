import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = FlexProps

export const SearchMenuLeftContainer: React.FC<Props> = memo<Props>((props) => {
  return <Flex alignItems="center" justifyContent="center" w={8} {...props} />
})
