import React, { useCallback, useState } from 'react'
import { Stack } from 'src/components/atoms'
import {
  GuideListItem,
  Item,
} from 'src/components/organisms/Navigation/Help/GuideListItem'

const items: Item[] = [
  {
    id: 1,
    number: 1,
    title: 'The right way to start',
    src: 'https://www.youtube.com/watch?v=6lt2JfJdGSY',
    description:
      'From tiny tasks to big goals, we organizes work so teams are clear on what to do, why it matters, and how to get it done.',
    icon: {
      name: 'checkCircle',
      color: 'white',
    },
    iconDone: {
      name: 'checkCircleFilled',
      color: 'teal.200',
    },
    done: true,
    time: '2 min read',
  },
  {
    id: 2,
    number: 2,
    title: 'Tips for tasks and projects',
    src: 'https://www.dailymotion.com/video/x5e9eog',
    description:
      'From tiny tasks to big goals, we organizes work so teams are clear on ',
    icon: {
      name: 'checkCircle',
      color: 'white',
    },
    iconDone: {
      name: 'checkCircleFilled',
      color: 'teal.200',
    },
    done: false,
    time: '3 min read',
  },
  {
    id: 3,
    number: 3,
    title: 'A better daily routine',
    src: 'https://vimeo.com/169599296',
    description:
      'From tiny tasks to big goals, we organizes work so teams are clear on ',
    icon: {
      name: 'checkCircle',
      color: 'white',
    },
    iconDone: {
      name: 'checkCircleFilled',
      color: 'teal.200',
    },
    done: false,
    time: '3 min read',
  },
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
          isOpen={state.find((s) => s.id === item.id)!.isOpen}
          onToggle={handleToggle}
        />
      ))}
    </Stack>
  )
}
