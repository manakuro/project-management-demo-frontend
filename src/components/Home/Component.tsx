import React, { memo } from 'react'
import { Layout } from 'src/components/Layout'
import { Head } from 'src/components/Head'

type Props = {}

export const Component: React.FC<Props> = memo<Props>((props) => {
  return (
    <Layout>
      <Head title="Manato" />
    </Layout>
  )
})
