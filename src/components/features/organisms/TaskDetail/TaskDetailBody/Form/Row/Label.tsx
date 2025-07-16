import type React from 'react'
import { Flex, type FlexProps } from 'src/components/ui/atoms'

type Props = FlexProps

export const Label: React.FC<Props> = (props) => {
  return (
    <Flex w="100px" {...props}>
      <Flex h={9} alignItems="center" fontSize="xs" color="text.muted">
        {props.children}
      </Flex>
    </Flex>
  )
}
