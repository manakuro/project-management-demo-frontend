import React, { ReactElement, useCallback, useState } from 'react'
import { Flex, Text, FlexProps } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { useHover } from 'src/hooks/useHover'

type Props = {
  name: string
  children(data: {
    showTransition: boolean
    handlePopoverProjectMenuOpened: () => void
    handlePopoverProjectMenuClosed: () => void
  }): ReactElement
}

const focusedStyle: FlexProps = {
  bg: 'gray.50',
  transform: 'translate(0, -5px)',
}
export const Container: React.FC<Props> = (props) => {
  const { ref, isHovering } = useHover()
  const [focused, setFocused] = useState(false)

  const handlePopoverProjectMenuOpened = useCallback(() => {
    setFocused(true)
  }, [])
  const handlePopoverProjectMenuClosed = useCallback(() => {
    setFocused(false)
  }, [])

  const showTransition = isHovering || focused

  return (
    <Flex
      borderRadius="3xl"
      _hover={focusedStyle}
      transition={transitions.base()}
      w="152px"
      h="226px"
      alignItems="center"
      pt={4}
      cursor="pointer"
      flexDirection="column"
      ref={ref}
      {...(focused ? focusedStyle : {})}
    >
      {props.children({
        showTransition,
        handlePopoverProjectMenuOpened,
        handlePopoverProjectMenuClosed,
      })}
      <Text mt={2}>{props.name}</Text>
    </Flex>
  )
}
