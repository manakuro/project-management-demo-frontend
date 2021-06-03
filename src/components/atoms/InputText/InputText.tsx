import React, { memo, useMemo } from 'react'
import { Box, Flex, Textarea } from 'src/components/atoms'
import { ChakraProps } from 'src/shared/chakra'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
} & ChakraProps

export const InputText: React.FC<Props> = memo<Props>((props) => {
  const { value, onChange, ...rest } = props

  const style = useMemo<ChakraProps>(
    () => ({
      w: 'full',
      h: 'full',
      minH: 'auto',
      m: 0,
      color: 'text.base',
      border: '1px',
      borderColor: 'transparent',
      borderRadius: 'md',
      paddingLeft: 2,
      paddingRight: 2,
      _hover: {
        borderColor: 'gray.400',
      },
      _focus: {
        borderColor: 'gray.400',
      },
    }),
    [],
  )

  return (
    <Flex position="relative" {...rest} w="full">
      <Box {...style} visibility="hidden">
        {value}
      </Box>
      <Textarea
        p={0}
        {...style}
        {...props}
        resize="none"
        onChange={onChange}
        position="absolute"
        top={0}
        left={0}
        focusBorderColor="transparent"
      >
        {value}
      </Textarea>
    </Flex>
  )
})
