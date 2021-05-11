import React, { memo } from 'react'
import { MainHeader, Tabs, TabPanels, TabPanel } from 'src/components/organisms'
import { Head } from 'src/components/atoms/Head'
import { Box } from 'src/components/atoms'
import { Header } from './Header'
import { List } from './List'

type Props = {}

export const Component: React.VFC<Props> = memo<Props>(() => {
  return (
    <Tabs defaultIndex={0}>
      <Box data-testid="Home">
        <Head title="My Tasks" />
        <MainHeader>
          <Header />
        </MainHeader>
        <Box mx="auto">
          <TabPanels>
            <TabPanel>
              <List />
            </TabPanel>
            <TabPanel>
              <p>Calendar!</p>
            </TabPanel>
            <TabPanel>
              <p>Files!</p>
            </TabPanel>
          </TabPanels>
        </Box>
      </Box>
    </Tabs>
  )
})
