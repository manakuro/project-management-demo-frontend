import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMenuStyle } from 'src/hooks'
import { MentionItem, useEditorMentionMenu } from 'src/components/organisms'
import { useHover } from 'src/hooks/useHover'

type Props = Override<
  FlexProps,
  {
    onClick: (val: string | number) => void
  }
> & {
  mention: MentionItem
  index: number
}

export const MentionItemBase: React.FC<Props> = memo<Props>((props) => {
  const { onClick, ...rest } = props
  const styles = useMenuStyle().item
  const { ref, isHovering } = useHover()
  const { selectedIndex, setSelectedIndex } = useEditorMentionMenu()

  delete styles._hover

  const handleClick = useCallback(() => {
    onClick(props.mention!.id)
  }, [onClick, props.mention])

  useEffect(() => {
    if (isHovering) setSelectedIndex(props.index)
  }, [isHovering, props.index, setSelectedIndex])

  const selected = useMemo(() => props.index === selectedIndex, [
    props.index,
    selectedIndex,
  ])

  return (
    <Flex
      ref={ref}
      bg={selected ? styles._focus.bg : 'transparent'}
      fontSize="sm"
      {...styles}
      onClick={handleClick}
      {...rest}
    >
      {props.children}
    </Flex>
  )
})
