import React, { memo, useCallback } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMenuStyle } from 'src/hooks'

type Props = Override<
  FlexProps,
  {
    onClick?: (val: string | number) => void
  }
> & {
  value: string | number
}

export const MentionItem: React.FC<Props> = memo<Props>((props) => {
  const { value, onClick, ...rest } = props
  const styles = useMenuStyle()

  const handleClick = useCallback(
    (val: string | number) => {
      onClick?.(val)
    },
    [onClick],
  )

  return (
    <Flex {...styles.item} onClick={() => handleClick(value)} {...rest}>
      {props.children}
    </Flex>
  )
})
