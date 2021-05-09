import React, { memo } from 'react'

import { NewButton } from './NewButton'
import { Flex } from 'src/components/atoms'

type Props = {}

export const Attachment: React.VFC<Props> = memo<Props>(() => {
  return (
    <Flex>
      <NewButton />
    </Flex>
  )
})
