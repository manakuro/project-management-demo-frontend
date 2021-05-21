import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { Header } from './Header'
import { Provider } from './Provider'

type Props = {
  feedId: string
}

export const FeedListItem: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Provider feedId={props.feedId}>
      <Component />
    </Provider>
  )
})

const Component: React.VFC = memo(() => {
  return (
    <Flex px={6} py={2}>
      <Header />
    </Flex>
  )
})
