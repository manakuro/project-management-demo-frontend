import React, { memo } from 'react'
import { MainHeader } from 'src/components/organisms'
import { Head } from 'src/components/atoms/Head'
import { Box } from 'src/components/atoms'
import { Header } from './Header'

type Props = {}

export const Component: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Box data-testid="Home">
      <Head title="Home" />
      <MainHeader>
        <Header />
      </MainHeader>
      <Box w="840px" mx="auto" py={10}>
        hey
      </Box>
    </Box>
  )
})
