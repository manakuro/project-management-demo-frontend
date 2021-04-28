import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Flex, FlexProps, Text } from 'src/components/atoms'
import { useMenuStyle } from 'src/hooks'
import { useEditorEmojiMenu } from 'src/components/organisms/Menus/EditorEmojiMenu'
import { useHover } from 'src/hooks/useHover'
import { BaseEmoji } from 'emoji-mart'

type Props = Override<
  FlexProps,
  {
    onClick: (val: any) => void
  }
> & {
  emoji: BaseEmoji
  index: number
}

export const EmojiItem: React.FC<Props> = memo<Props>((props) => {
  const { onClick, ...rest } = props
  const styles = useMenuStyle().item
  const { ref, isHovering } = useHover()
  const { selectedIndex, setSelectedIndex } = useEditorEmojiMenu()

  delete styles._hover

  const handleClick = useCallback(() => {
    onClick({ id: props.emoji!.id })
  }, [onClick, props.emoji])

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
      alignItems="center"
      {...styles}
      onClick={handleClick}
      {...rest}
    >
      <Text fontSize="sm">{props.emoji.native}</Text>
      <Text ml={2} fontSize="sm" color="text.muted">
        {props.emoji.colons}
      </Text>
    </Flex>
  )
})
