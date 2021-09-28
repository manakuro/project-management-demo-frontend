import React, { memo, useCallback, useEffect, useState } from 'react'
import { Input, InputProps } from 'src/components/atoms'
import { useDebounce } from 'src/hooks'

type Props = {
  value: string
  onChange: (val: string) => void
} & Omit<InputProps, 'onChange'>

export const NameField: React.FC<Props> = memo<Props>((props) => {
  const [value, setValue] = useState<string>(props.value)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useDebounce(value, props.onChange, 500)

  return (
    <Input
      onClick={(e) => e.stopPropagation()}
      onChange={handleChange}
      value={value}
      autoFocus
    />
  )
})
NameField.displayName = 'NameField'
