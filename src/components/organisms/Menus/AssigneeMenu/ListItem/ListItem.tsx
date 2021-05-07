import React, { memo, useEffect, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMenuStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'
import { useAssigneeMenu } from 'src/components/organisms/Menus/AssigneeMenu/useAssigneeMenu'

type Props = FlexProps & {
  index: number
}

export const ListItem: React.FC<Props> = memo<Props>((props) => {
  const styles = useMenuStyle().item
  const { ref, isHovering } = useHover()
  const { selectedIndex, setSelectedIndex } = useAssigneeMenu()

  delete styles._hover

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
      {...props}
    />
  )
})