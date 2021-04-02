import React from 'react'
import { Flex, InputText } from 'src/components/atoms'

type Props = {}

export const Form: React.FC<Props> = (props) => {
  return (
    <Flex flexDirection="column" py={2}>
      <Flex px={4}>
        <InputText
          fontSize="2xl"
          fontWeight="semibold"
          value="Organize components folder"
          onChange={() => {}}
        />
      </Flex>
    </Flex>
  )
}
