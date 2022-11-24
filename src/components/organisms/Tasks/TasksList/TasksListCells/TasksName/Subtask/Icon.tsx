import React, { memo } from 'react'
import { Flex, Icon as AtomsIcon, Text, TextProps } from 'src/components/atoms'

type Props = {
  size: number
  textStyle?: TextProps
}

export const Icon: React.FC<Props> = memo<Props>((props) => {
  const { size, textStyle } = props

  return (
    <Flex alignItems="center" justifyContent="center">
      <Text fontSize="xs" color="primary" {...textStyle}>
        {size}
      </Text>
      <AtomsIcon icon="flowChildren" color="primary" ml={1} />
    </Flex>
  )
})
Icon.displayName = 'Icon'
