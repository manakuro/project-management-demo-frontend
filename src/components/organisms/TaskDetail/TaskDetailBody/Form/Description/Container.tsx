import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useDescription } from './Provider'

type Props = FlexProps

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { ref, focused, onFocus } = useDescription()

  return (
    <Flex
      ref={ref}
      border="1px"
      borderRadius="md"
      borderColor={focused ? 'gray.400' : 'transparent'}
      _hover={{
        borderColor: 'gray.400',
      }}
      py={2}
      px={3}
      flexDirection="column"
      flex={1}
      onFocus={onFocus}
      {...props}
    />
  )
})
Container.displayName = 'Container'
