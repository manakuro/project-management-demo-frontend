import { Item } from 'src/components/organisms/Navigation/Help/Body/GuideListItem'
import { Detail } from './Detail'

export const guide1Item: Item = {
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
  detailComponent: <Detail />,
}
