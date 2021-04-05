import React, { useCallback, useState } from 'react'
import { Button, ButtonProps, Text, Box } from 'src/components/atoms'
import { Input } from './Input'

type Props = {}

const focusedStyle: ButtonProps = {
  bg: 'transparent',
  border: '1px',
  borderColor: 'gray.200',
  _hover: {
    bg: 'transparent',
  },
}

export const UnSelected: React.FC<Props> = (props) => {
  const [focused, setFocused] = useState(false)

  const handleClick = useCallback(() => {
    setFocused(true)
  }, [])

  const handleClickInputOutside = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <Button
      as={Box}
      variant="ghost"
      size="sm"
      border="1px"
      borderColor="transparent"
      onClick={handleClick}
      cursor="pointer"
      {...(focused ? focusedStyle : {})}
    >
      {focused ? (
        <Input onClickOutside={handleClickInputOutside} />
      ) : (
        <>
          <Text fontSize="sm">Add to projects</Text>
        </>
      )}
    </Button>
  )
}
