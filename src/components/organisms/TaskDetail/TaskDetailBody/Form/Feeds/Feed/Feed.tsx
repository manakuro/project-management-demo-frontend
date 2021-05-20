import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'

type Props = {
  feedId: string
}

export const Feed: React.VFC<Props> = memo<Props>(() => {
  return <Flex>hey</Flex>
})
