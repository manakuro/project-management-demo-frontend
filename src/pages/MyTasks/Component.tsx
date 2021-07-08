import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { Head } from 'src/components/atoms/Head'
import { MainHeader, Tabs, TabPanels, TabPanel } from 'src/components/organisms'
import { Header } from './Header'
import { List } from './List'
import { Provider } from './Provider'

type Props = {
  loading: boolean
}

export const Component: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Provider loading={props.loading}>
      <Tabs defaultIndex={0} flex={1} display="flex">
        <Flex data-testid="MyTasks" flex={1} flexDirection="column">
          <Head title="My Tasks" />
          <MainHeader>
            <Header />
          </MainHeader>
          <Flex flex={1}>
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
          </Flex>
        </Flex>
      </Tabs>
    </Provider>
  )
})
Component.displayName = 'Component'
