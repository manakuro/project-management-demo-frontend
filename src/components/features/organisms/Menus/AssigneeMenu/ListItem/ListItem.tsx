import type React from 'react'
import { memo, useEffect, useMemo } from 'react'
import { useAssigneeMenu } from 'src/components/features/organisms/Menus/AssigneeMenu/useAssigneeMenu'
import { Flex, type FlexProps } from 'src/components/ui/atoms'
import { useMenuStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'

type Props = FlexProps & {
  index: number
}

export const ListItem: React.FC<Props> = memo<Props>((props) => {
  const styles = useMenuStyle().item
  const { ref, isHovering } = useHover()
  const { selectedIndex, setSelectedIndex } = useAssigneeMenu()

  styles._hover = undefined

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
      {...props}
    />
  )
})
ListItem.displayName = 'ListItem'
