import React, { useCallback, useState } from 'react'
import { Stack } from 'src/components/atoms'
import { GuideListItem, Item } from './GuideListItem'
import { guide1Item } from './Guide1'
import { guide2Item } from './Guide2'

const items: Item[] = [
  guide1Item,
  guide2Item,
  // {
  //   id: 3,
  //   number: 3,
  //   title: 'A better daily routine',
  //   src: 'https://vimeo.com/169599296',
  //   description:
  //     'From tiny tasks to big goals, we organizes work so teams are clear on ',
  //   icon: {
  //     name: 'checkCircle',
  //     color: 'white',
  //   },
  //   iconDone: {
  //     name: 'checkCircleFilled',
  //     color: 'teal.200',
  //   },
  //   done: false,
  //   time: '3 min read',
  // },
  // {
  //   id: 4,
  //   number: 4,
  //   title: 'Additional resources',
  //   src: '',
  //   description:
  //     'From tiny tasks to big goals, we organizes work so teams are clear on ',
  //   icon: {
  //     name: 'copyAlt',
  //     color: 'white',
  //   },
  //   iconDone: {
  //     name: 'copyAlt',
  //     color: 'white',
  //   },
  //   done: false,
  //   time: '2 min read',
  // },
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
