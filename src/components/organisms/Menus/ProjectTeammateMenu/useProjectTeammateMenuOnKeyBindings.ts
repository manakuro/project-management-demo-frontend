import { useCallback } from 'react'
import { useKeyPress } from 'src/hooks'
import { useProjectTeammateMenuIndex } from './useProjectTeammateMenuIndex'
import { useProjectTeammateMenuRef } from './useProjectTeammateMenuRef'

type Props<Item> = {
  items: Item[]
  onSetValue: (item: Item) => void
}

export const useProjectTeammateMenuOnKeyBindings = <Item>(
  props: Props<Item>,
) => {
  const { element } = useProjectTeammateMenuRef()
  const { setSelectedIndex, selectedIndex } = useProjectTeammateMenuIndex()

  const scrollTo = useCallback(
    (index: number) => {
      const dom = element
      if (!dom) return

      if (index === 0) dom.scrollTop = 0
      if (index < 5) return

      dom.scrollTop += 50 * index
    },
    [element],
  )

  const onArrowDown = useCallback(() => {
    const index = selectedIndex + 1
    if (index > props.items.length) {
      setSelectedIndex(0)
      scrollTo(0)
      return
    }

    setSelectedIndex(index)
    scrollTo(index)
  }, [props.items.length, scrollTo, setSelectedIndex, selectedIndex])

  const onArrowUp = useCallback(() => {
    const index = selectedIndex - 1
    if (index < 0) {
      setSelectedIndex(props.items.length)
      scrollTo(props.items.length)
      return
    }

    setSelectedIndex(index)
    scrollTo(-index)
  }, [props.items.length, scrollTo, setSelectedIndex, selectedIndex])

  const onEnter = useCallback(() => {
    const item = props.items.find((_, i) => i === selectedIndex)

    // Do nothing when it is entered without selecting an item
    if (!item) return

    props.onSetValue(item)
  }, [props, selectedIndex])

  useKeyPress({
    targetKey: 'ArrowDown',
    onKeyPress: onArrowDown,
  })

  useKeyPress({
    targetKey: 'ArrowUp',
    onKeyPress: onArrowUp,
  })

  useKeyPress({
    targetKey: 'Enter',
    onKeyPress: onEnter,
  })

  return {
    onArrowDown,
    onArrowUp,
    onEnter,
  }
}
