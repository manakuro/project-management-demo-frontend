import React, { memo } from 'react'
import { Box, Button, Flex, Heading, Icon, Stack } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from 'src/components/organisms/Accordion'
import { useTasksDueSoonIds } from 'src/store/app/home/tasksDueSoon'
import { ListItem } from './ListItem'

type Props = {}

export const TasksDueSoon: React.VFC<Props> = memo<Props>(() => {
  const { taskIds } = useTasksDueSoonIds()

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
                  Tasks Due Soon
                </Heading>
              </AccordionButton>
              <Tooltip
                hasArrow
                label="These are your most urgent tasks due in the next five days"
                aria-label="A tasks due soon description"
                size="lg"
                withIcon
              >
                <Icon icon="help" size="xs" color="gray.500" mt="-1px" />
              </Tooltip>
              <Button
                as={Box}
                variant="ghost"
                size="xs"
                ml={1}
                colorScheme="gray"
                cursor="pointer"
              >
                See all my tasks
              </Button>
            </Flex>

            <AccordionPanel p={0}>
              <Box py={4}>
                <Stack spacing={2}>
                  {taskIds?.map((id) => (
                    <ListItem taskId={id} key={id} />
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
TasksDueSoon.displayName = 'TasksDueSoon'
