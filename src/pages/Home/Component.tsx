import React, { memo } from 'react'
import { Layout } from 'src/components/organisms'
import { Head } from 'src/components/atoms/Head'

type Props = {}

export const Component: React.FC<Props> = memo<Props>((props) => {
  return (
    <Layout>
      <Head title="Home" />
    </Layout>
  )
})
