import React, { memo, useCallback } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMenuStyle } from 'src/hooks'
import { MentionItem } from 'src/components/organisms'

type Props = Override<
  FlexProps,
  {
    onClick?: (val: string | number) => void
  }
> & {
  mention?: MentionItem
  selected?: boolean
}

export const MentionItemBase: React.FC<Props> = memo<Props>((props) => {
  const { onClick, ...rest } = props
  const styles = useMenuStyle()

  const handleClick = useCallback(() => {
    if (!onClick) return
    onClick(props.mention!.id)
  }, [onClick, props.mention])

  return (
    <Flex
      bg={props.selected ? styles.item._focus.bg : 'transparent'}
      fontSize="sm"
      {...styles.item}
      onClick={handleClick}
      {...rest}
    >
      {props.children}
    </Flex>
  )
})
