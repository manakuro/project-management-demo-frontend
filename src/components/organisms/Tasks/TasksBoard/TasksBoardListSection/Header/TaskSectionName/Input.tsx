import React, { memo, useCallback, useState } from 'react'
import { Input as AtomsInput, InputProps } from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'

type Props = {
  onClickOutside: () => void
  onChange: (val: string) => void
  value: string
} & Omit<InputProps, 'onChange'>

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { onClickOutside, onChange, ...rest } = props
  const [value, setValue] = useState<string>(props.value)

  const handleClickOutside = useCallback(() => {
    props.onChange(value)
    props.onClickOutside()
  }, [props, value])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const { ref } = useClickOutside(handleClickOutside)

  return (
    <AtomsInput
      ref={ref}
      autoFocus
      fontSize="md"
      placeholder="New section"
      variant="unstyled"
      fontWeight="semibold"
      border="1px"
      borderColor="gray.300"
      px={2}
      maxW={80}
      bg="white"
      {...rest}
      onChange={handleChange}
      value={value}
    />
  )
})
Input.displayName = 'Input'
