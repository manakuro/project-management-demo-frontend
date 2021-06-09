import { BaseEmoji } from 'emoji-mart'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Flex, FlexProps, Text } from 'src/components/atoms'
import { useEditorEmojiMenu } from 'src/components/organisms/Menus/EditorEmojiMenu'
import { useMenuStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'

type Props = Override<
  FlexProps,
  {
    onClick: (val: BaseEmoji) => void
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
    onClick(props.emoji)
  }, [onClick, props.emoji])

  useEffect(() => {
    if (isHovering) setSelectedIndex(props.index)
  }, [isHovering, props.index, setSelectedIndex])

  const selected = useMemo(
    () => props.index === selectedIndex,
    [props.index, selectedIndex],
  )

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
