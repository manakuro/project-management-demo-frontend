import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useMainStyle } from 'src/hooks/useMainStyle'

type Props = {}

export const TasksHeader: React.FC<Props> = memo<Props>((props) => {
  const { paddingX } = useMainStyle()

  return (
    <Flex flex={1} px={paddingX} py={4}>
      {props.children}
    </Flex>
  )
})
