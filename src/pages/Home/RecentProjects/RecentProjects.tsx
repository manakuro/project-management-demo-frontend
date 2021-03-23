import React, { memo, useState } from 'react'
import { Box, Flex, Heading, Icon, Stack } from 'src/components/atoms'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from 'src/components/organisms'
import { useProjects } from 'src/store/projects'
import { ListItemTile, ListItemTileNew } from './ListItemTile'
import { ListItemList, ListItemListNew } from './ListItemList'
import { ListIcon } from './ListIcon'

type Props = {}

export const VIEW_AS_TILES = '1' as const
export const VIEW_AS_LIST = '2' as const
export type ListStatus = typeof VIEW_AS_TILES | typeof VIEW_AS_LIST

export const PADDING_X = 2
export const RecentProjects: React.VFC<Props> = memo<Props>(() => {
  const { projectIds } = useProjects()
  const [listStatus, setListStatus] = useState<ListStatus>(VIEW_AS_TILES)

  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <Flex
              py={1}
              px={PADDING_X}
              borderBottom="1px"
              borderColor="gray.200"
            >
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
              <>
                {listStatus === VIEW_AS_TILES ? (
                  <Box py={4}>
                    <Stack direction="row" spacing={6}>
                      {projectIds.map((id) => (
                        <ListItemTile projectId={id} key={id} />
                      ))}
                      <ListItemTileNew />
                    </Stack>
                  </Box>
                ) : (
                  <>
                    {projectIds.map((id) => (
                      <ListItemList projectId={id} key={id} />
                    ))}
                    <ListItemListNew />
                  </>
                )}
              </>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
})
