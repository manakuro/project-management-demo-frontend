import React, { memo } from 'react'
import { Layout, MainHeader } from 'src/components/organisms'
import { Head } from 'src/components/atoms/Head'
import { Heading } from 'src/components/atoms'

type Props = {}

export const Component: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Layout>
      <Head title="Home" />
      <MainHeader>
        <Heading as="h2" size="md">
          Home
        </Heading>
      </MainHeader>
    </Layout>
  )
})
