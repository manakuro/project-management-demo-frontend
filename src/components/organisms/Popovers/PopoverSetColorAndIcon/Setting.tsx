import React from 'react'
import { Checkbox, Flex, Text } from 'src/components/atoms'

type Props = {
  isSetForEveryone: boolean
}

export const Setting: React.VFC<Props> = (props) => {
  return (
    <Flex px={6} py={4}>
      <Checkbox defaultIsChecked={props.isSetForEveryone}>
        <Text fontSize="xs">Set for everyone</Text>
      </Checkbox>
    </Flex>
  )
}
