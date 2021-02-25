import React, { useCallback, useState } from 'react'
import { Stack } from 'src/components/atoms'
import { GuideListItem, Item } from './GuideListItem'
import { guide1Item } from './Guide1'
import { guide2Item } from './Guide2'
import { guide3Item } from './Guide3'
import { guide4Item } from './Guide4'

const items: Item[] = [guide1Item, guide2Item, guide3Item, guide4Item]

export const Body: React.VFC = () => {
  const [state, setState] = useState<{ id: number; isOpen: boolean }[]>(
    items.map((i) => ({ id: i.id, isOpen: false })),
  )
  const handleToggle = useCallback((id: number) => {
    setState((prev) => {
      const current = prev.find((p) => p.isOpen)
      // Close the list item that is opened.
      if (current?.isOpen && current?.id === id)
        return prev.map((p) => ({ ...p, isOpen: false }))

      return prev.map((p) => ({ ...p, isOpen: p.id === id }))
    })
  }, [])

  return (
    <Stack w="full" spacing={4} mb={80}>
      {items.map((item, i) => (
        <GuideListItem
          key={i}
          item={item}
          nextItem={items[i + 1]}
          isOpen={state.find((s) => s.id === item.id)!.isOpen}
          onToggle={handleToggle}
        />
      ))}
    </Stack>
  )
}
