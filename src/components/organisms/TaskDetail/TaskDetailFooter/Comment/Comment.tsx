import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { MyAvatar } from 'src/components/molecules'
import { Input } from './Input'

type Props = {}

export const Comment: React.FC<Props> = memo(() => {
  return (
    <Flex flex={1}>
      <MyAvatar />
      <Input />
    </Flex>
  )
})
