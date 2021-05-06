import React, { memo, useCallback, useState } from 'react'
import { ConditionalRender, Flex } from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'
import { MaybeRenderProp, runIfFn } from 'src/shared/utils'

type Props = {
  children: MaybeRenderProp<{ focused: boolean }>
}

export const Container: React.FC<Props> = memo<Props>((props) => {
  const [focused, setFocused] = useState(false)
  const { ref } = useClickOutside(() => {
    setFocused(false)
  })

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  return (
    <ConditionalRender client>
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
        onFocus={handleFocus}
      >
        {runIfFn(props.children, { focused })}
      </Flex>
    </ConditionalRender>
  )
})
