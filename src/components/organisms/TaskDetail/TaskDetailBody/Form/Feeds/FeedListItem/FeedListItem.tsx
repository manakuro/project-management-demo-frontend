import React, { memo } from 'react'
import { Header } from './Header'
import { Provider } from './Provider'
import { Provider as ProviderContainer } from './Provider/ProviderContainer'
import { Content } from './Content'
import { Container } from './Container'

type Props = {
  feedId: string
  isPinned?: boolean
}

export const FeedListItem: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Provider feedId={props.feedId} isPinned={props.isPinned}>
      <ProviderContainer feedId={props.feedId} isPinned={props.isPinned}>
        <Component />
      </ProviderContainer>
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
