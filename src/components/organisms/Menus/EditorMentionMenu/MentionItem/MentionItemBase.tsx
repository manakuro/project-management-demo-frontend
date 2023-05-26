import React, { memo, useCallback, useEffect, useMemo } from 'react'
import {
  SetValueParam,
  useEditorMentionMenu,
} from 'src/components/organisms/Menus/EditorMentionMenu'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { useMenuStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'
import { Mention } from 'src/store/entities/mention'

type Props = Override<
  FlexProps,
  {
    onClick: (val: SetValueParam) => void
  }
> & {
  mention: Mention
  index: number
}

export const MentionItemBase: React.FC<Props> = memo<Props>((props) => {
  const { onClick, ...rest } = props
  const styles = useMenuStyle().item
  const { ref, isHovering } = useHover()
  const { selectedIndex, setSelectedIndex } = useEditorMentionMenu()

  delete styles._hover

  const handleClick = useCallback(() => {
    onClick({ id: props.mention.id, type: props.mention.type })
  }, [onClick, props.mention])

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
      {...styles}
      bg={selected ? styles._focus.bg : 'transparent'}
      fontSize="sm"
      onClick={handleClick}
      {...rest}
    >
      {props.children}
    </Flex>
  )
})
MentionItemBase.displayName = 'MentionItemBase'
