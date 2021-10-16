import React, { memo, useMemo } from 'react'
import {
  Box,
  Flex,
  FlexProps,
  Textarea,
  TextareaProps,
} from 'src/components/atoms'
import { ChakraProps } from 'src/shared/chakra'

type Props = {
  value: string
  onChange: TextareaProps['onChange']
  onClick?: FlexProps['onClick']
  onKeyDown?: TextareaProps['onKeyDown']
  onFocus?: TextareaProps['onFocus']
  onBlur?: TextareaProps['onBlur']
  autoFocus?: TextareaProps['autoFocus']
  containerStyle?: FlexProps
  placeholder?: string
  textareaRef?: React.ForwardedRef<any>
} & ChakraProps

export const InputText: React.FC<Props> = memo<Props>((props) => {
  const {
    value,
    onChange,
    onKeyDown,
    containerStyle,
    placeholder,
    onClick,
    onFocus,
    onBlur,
    autoFocus,
    textareaRef,
    ...rest
  } = props

  const style = useMemo<ChakraProps>(
    () => ({
      w: 'full',
      h: 'full',
      minH: props.minH || 'auto',
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
        borderColor: 'gray.500',
      },
    }),
    [props.minH],
  )

  return (
    <Flex
      flex={1}
      position="relative"
      onClick={onClick}
      {...rest}
      {...containerStyle}
      w="full"
    >
      <Box {...style} visibility="hidden">
        {value}
      </Box>
      <Textarea
        ref={textareaRef}
        p={0}
        {...style}
        {...rest}
        resize="none"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        position="absolute"
        top={0}
        left={0}
        focusBorderColor="transparent"
        value={value}
        placeholder={placeholder}
      >
        {value}
      </Textarea>
    </Flex>
  )
})
InputText.displayName = 'InputText'
