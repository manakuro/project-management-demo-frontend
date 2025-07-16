import { memo } from 'react'
import { MyAvatar } from 'src/components/features/organisms/MyAvatar'
import { Flex } from 'src/components/ui/atoms'
import { Input } from './Input'

export const Comment = memo(function Comment() {
  return (
    <Flex flex={1}>
      <Flex alignItems="center" h={9}>
        <MyAvatar size="xs" />
      </Flex>
      <Input />
    </Flex>
  )
})
