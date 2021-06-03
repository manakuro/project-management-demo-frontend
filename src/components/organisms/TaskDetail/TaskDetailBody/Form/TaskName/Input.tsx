import React, { memo, useCallback, useState } from 'react'
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

  useDebounce(value, props.onChange, 500)

  return (
    <Flex px={4}>
      <InputText
        fontSize="2xl"
        fontWeight="semibold"
        value={value}
        onChange={handleChange}
      />
    </Flex>
  )
})
Input.displayName = 'TaskName'
