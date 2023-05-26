import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { useInputContext } from './Provider'

type Props = FlexProps

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { ref, onFocus, focused } = useInputContext()

  return (
    <Flex
      ref={ref}
      border="1px"
      borderRadius="md"
      borderColor="gray.400"
      py={focused ? 2 : 1}
      px={2}
      flexDirection="column"
      flex={1}
      bg="white"
      minH={focused ? 40 : 0}
      transition="min-height .25s"
      position="relative"
      onFocus={onFocus}
      {...props}
    />
  )
})
Container.displayName = 'Container'
