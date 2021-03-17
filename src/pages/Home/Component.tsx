import React, { memo } from 'react'
import { Layout, MainHeader } from 'src/components/organisms'
import { Head } from 'src/components/atoms/Head'
import { Heading, Box, Stack } from 'src/components/atoms'
import { TasksDueSoon } from './TasksDueSoon'

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
      <Box w="840px" mx="auto" py={10}>
        <Stack spacing={10}>
          <TasksDueSoon />
        </Stack>
      </Box>
    </Layout>
  )
})
