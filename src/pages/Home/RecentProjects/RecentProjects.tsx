import React, { memo, useState } from 'react'
import { Box, Flex, Heading, Icon, Stack } from 'src/components/atoms'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from 'src/components/organisms'
import { useProjects } from 'src/store/projects'
import { ListItemTiles } from './ListItemTiles'
import { ListIcon } from './ListIcon'

type Props = {}

export const VIEW_AS_TILES = '1' as const
export const VIEW_AS_LIST = '2' as const
export type ListStatus = typeof VIEW_AS_TILES | typeof VIEW_AS_LIST

export const RecentProjects: React.VFC<Props> = memo<Props>(() => {
  const { projectIds } = useProjects()
  const [listStatus, setListStatus] = useState<ListStatus>(VIEW_AS_TILES)

  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <Flex py={1} px={2} borderBottom="1px" borderColor="gray.200">
              <AccordionButton p={0} _hover={{ bg: 'none' }}>
                {isExpanded ? (
                  <Icon icon="chevronDown" mt="1px" />
                ) : (
                  <Icon icon="chevronRight" mt="1px" />
                )}
                <Heading ml={2} as="h4" size="sm" flex="1" textAlign="left">
                  Recent Projects
                </Heading>
              </AccordionButton>
              <ListIcon listStatus={listStatus} onChange={setListStatus} />
            </Flex>
            <AccordionPanel p={0}>
              <Box py={4}>
                <Stack direction="row" spacing={6}>
                  {projectIds.map((id) => (
                    <ListItemTiles projectId={id} key={id} />
                  ))}
                </Stack>
              </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
})
