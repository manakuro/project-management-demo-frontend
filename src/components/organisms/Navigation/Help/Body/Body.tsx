import React from 'react'
import { Stack } from 'src/components/atoms'
import {
  GuideListItem,
  Item,
} from 'src/components/organisms/Navigation/Help/GuideListItem'

const items: Item[] = [
  {
    title: 'The right way to start',
    src: '',
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
    done: true,
  },
  {
    title: 'Tips for tasks and projects',
    src: '',
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
  },
  {
    title: 'A better daily routine',
    src: '',
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
  },
  {
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
  },
]

export const Body: React.VFC = () => {
  return (
    <Stack w="full" spacing={4}>
      {items.map((n, i) => (
        <GuideListItem key={i} item={n} />
      ))}
    </Stack>
  )
}
