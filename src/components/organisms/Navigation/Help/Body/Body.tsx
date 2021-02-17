import React from 'react'
import { Stack } from 'src/components/atoms'
import {
  GuideListItem,
  Item,
} from 'src/components/organisms/Navigation/Help/GuideListItem'

const items: Item[] = [
  {
    number: 1,
    title: 'The right way to start',
    src: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
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
  return (
    <Stack w="full" spacing={4} mb={80}>
      {items.map((n, i) => (
        <GuideListItem key={i} item={n} />
      ))}
    </Stack>
  )
}
