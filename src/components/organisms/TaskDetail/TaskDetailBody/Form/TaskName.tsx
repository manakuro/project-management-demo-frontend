import React, { memo } from 'react'
import { Flex, InputText } from 'src/components/atoms'

type Props = {}

export const TaskName: React.FC<Props> = memo<Props>(() => {
  return (
    <Flex px={4}>
      <InputText
        fontSize="2xl"
        fontWeight="semibold"
        value="Organize components folder"
        onChange={() => {}}
      />
    </Flex>
  )
})
