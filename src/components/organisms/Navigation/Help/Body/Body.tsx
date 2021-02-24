import React, { useCallback, useState } from 'react'
import { Stack } from 'src/components/atoms'
import { GuideListItem, Item } from './GuideListItem'
import { guide1Item } from './Guide1'
import { guide2Item } from './Guide2'
import { guide3Item } from './Guide3'

const items: Item[] = [
  guide1Item,
  guide2Item,
  guide3Item,
  {
    id: 4,
    number: 4,
    title: 'Additional resources',
    src: '',
    description:
      'From tiny tasks to big goals, we organizes work so teams are clear on ',
    icon: {
      name: 'copyAlt',
      color: 'white',
    },
    iconDone: {
      name: 'copyAlt',
      color: 'white',
    },
    done: false,
    time: '2 min read',
    detailComponent: <div>hey</div>,
  },
]

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
