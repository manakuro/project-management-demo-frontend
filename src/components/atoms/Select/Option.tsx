import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms'

type Props = {
  value: string
  text: string
  onChange?: (val: string) => void
}

export const Option: React.FC<Props> = memo<Props>((props) => {
  const handleChange = useCallback(
    (val: string) => {
      props.onChange?.(val)
    },
    [props],
  )

  return (
    <MenuItem onClick={() => handleChange(props.value)}>{props.text}</MenuItem>
  )
})
