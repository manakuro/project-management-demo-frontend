import React, { memo, useCallback } from 'react'
import { MenuItem, MenuItemProps } from 'src/components/organisms'

type Props = Override<
  MenuItemProps,
  {
    onClick?: (val: string) => void
  }
> & {
  value: string
}

export const MentionItem: React.FC<Props> = memo<Props>((props) => {
  const { value, onClick, ...rest } = props

  const handleClick = useCallback(
    (val: string) => {
      onClick?.(val)
    },
    [onClick],
  )

  return (
    <MenuItem onClick={() => handleClick(value)} {...rest}>
      {props.children}
    </MenuItem>
  )
})