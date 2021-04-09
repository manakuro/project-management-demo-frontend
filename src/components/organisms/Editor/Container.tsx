import React, { memo, useCallback, useEffect, useState } from 'react'
import { ConditionalRender, Flex } from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'

type Props = {}

export const Container: React.FC<Props> = memo<Props>((props) => {
  const [focused, setFocused] = useState(false)
  const { ref, hasClickedOutside } = useClickOutside()

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  useEffect(() => {
    if (hasClickedOutside) {
      setFocused(false)
    }
  }, [hasClickedOutside])

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
        p={3}
        flexDirection="column"
        flex={1}
        onFocus={handleFocus}
      >
        {props.children}
      </Flex>
    </ConditionalRender>
  )
})
