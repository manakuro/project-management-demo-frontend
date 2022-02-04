import React, { memo } from 'react'
import { Container } from './Container'
import { Content } from './Content'
import { Header } from './Header'
import { Provider } from './Provider'

type Props = {
  taskFeedId: string
  taskId: string
  isPinned?: boolean
}

export const FeedListItem: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Provider {...props}>
      <Component />
    </Provider>
  )
})

const Component: React.VFC = memo(() => {
  return (
    <Container>
      <Header />
      <Content />
    </Container>
  )
})
Component.displayName = 'Component'
FeedListItem.displayName = 'FeedListItem'
