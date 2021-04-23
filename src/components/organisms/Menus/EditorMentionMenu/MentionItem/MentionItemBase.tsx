import React, { memo, useCallback, useEffect } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMenuStyle } from 'src/hooks'
import { MentionItem } from 'src/components/organisms'
import { useHover } from 'src/hooks/useHover'

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
  const styles = useMenuStyle().item
  const { ref, isHovering } = useHover()

  delete styles._hover

  const handleClick = useCallback(() => {
    if (!onClick) return
    onClick(props.mention!.id)
  }, [onClick, props.mention])

  useEffect(() => {
    if (isHovering) {
      console.log('isHovering!')
    }
  }, [isHovering])

  return (
    <Flex
      ref={ref}
      bg={props.selected ? styles._focus.bg : 'transparent'}
      fontSize="sm"
      {...styles}
      onClick={handleClick}
      {...rest}
    >
      {props.children}
    </Flex>
  )
})
