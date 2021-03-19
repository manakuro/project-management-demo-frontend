import React, { memo } from 'react'
import { Box, Heading, Icon, IconButton, Stack } from 'src/components/atoms'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from 'src/components/organisms'
import { useProjects } from 'src/store/projects'
import { ListItem } from './ListItem'

type Props = {}

export const RecentProjects: React.VFC<Props> = memo<Props>(() => {
  const { projectIds } = useProjects()

  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <AccordionButton
              py={1}
              px={2}
              borderBottom="1px"
              borderColor="gray.200"
              _hover={{ bg: 'none' }}
            >
              {isExpanded ? (
                <Icon icon="chevronDown" mt="1px" />
              ) : (
                <Icon icon="chevronRight" mt="1px" />
              )}
              <Heading ml={2} as="h4" size="sm" flex="1" textAlign="left">
                Recent Projects
              </Heading>
              <IconButton
                aria-label="list icon"
                icon={<Icon icon="table" color="text.muted" size="sm" />}
                variant="ghost"
              />
            </AccordionButton>
            <AccordionPanel p={0}>
              <Box py={4}>
                <Stack direction="row" spacing={6}>
                  {projectIds.map((id) => (
                    <ListItem projectId={id} key={id} />
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
