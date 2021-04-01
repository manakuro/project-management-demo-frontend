import React, { memo, useMemo } from 'react'
import { Box, Flex, Input, InputProps } from 'src/components/atoms'

type Props = {
  value: string
  onChange: () => void
  onInputFocus: () => void
  onInputBlur: () => void
} & InputProps

export const TasksNameField: React.FC<Props> = memo<Props>((props) => {
  const style = useMemo<InputProps>(
    () => ({
      ml: 1,
      fontSize: 'sm',
      color: 'text.base',
      minH: 5,
      h: 5,
      border: '1px',
      borderColor: 'transparent',
      borderRadius: 'sm',
      paddingInlineStart: 2,
      paddingInlineEnd: 2,
      _hover: {
        borderColor: 'gray.400',
      },
    }),
    [],
  )

  return (
    <Flex position="relative">
      <Box {...style} visibility="hidden">
        {props.value}
      </Box>
      <Input
        onChange={props.onChange}
        value={props.value}
        {...style}
        position="absolute"
        top={0}
        focusBorderColor="transparent"
        onFocus={props.onInputFocus}
        onBlur={props.onInputBlur}
      />
    </Flex>
  )
})
