import React, { memo, useCallback, useEffect, useState } from 'react'
import { Flex, InputText } from 'src/components/atoms'
import { useDebounce } from 'src/hooks'

type Props = {
  value: string
  onChange: (val: string) => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const [value, setValue] = useState<string>(props.value)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
    },
    [],
  )

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.code === 'Enter') e.preventDefault()
  }, [])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useDebounce(value, props.onChange, 500)

  return (
    <Flex flex={1} px={4}>
      <InputText
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        fontSize="2xl"
        fontWeight="semibold"
        minH="38px"
        placeholder="Write a task name"
      />
    </Flex>
  )
})
Input.displayName = 'Input'
