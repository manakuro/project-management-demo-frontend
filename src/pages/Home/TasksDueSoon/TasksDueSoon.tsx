import React, { memo, useEffect, useState } from 'react'
import { Box, Button, Heading, Icon, Stack } from 'src/components/atoms'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from 'src/components/organisms'
import { ListItem } from './/ListItem'
import { TaskDueSoon } from './types'
import { Tooltip } from 'src/components/molecules'

type Props = {}

const fetchTasksDueSoon = (): Promise<TaskDueSoon[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          projectId: '1',
          name: 'Implement home page',
          dueDate: 'Today',
          isDone: true,
        },
        {
          id: '2',
          projectId: '1',
          name: 'Implement Task Due Soon',
          dueDate: 'Monday',
          isDone: false,
        },
        {
          id: '3',
          projectId: '2',
          name: 'Implement Recent Projects',
          dueDate: 'Tuesday',
          isDone: false,
        },
      ])
    }, 1000)
  })
}
const useTasksDueSoonQuery = () => {
  const [tasks, setTasks] = useState<TaskDueSoon[]>()

  useEffect(() => {
    ;(async () => {
      const res = await fetchTasksDueSoon()
      setTasks(res)
    })()
  }, [])

  return {
    tasks,
  }
}

export const TasksDueSoon: React.VFC<Props> = memo<Props>(() => {
  const { tasks } = useTasksDueSoonQuery()

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
                Tasks Due Soon
              </Heading>
              <Tooltip
                hasArrow
                color="white"
                bg="gray.800"
                label="These are your most urgent tasks due in the next five days"
                aria-label="A tasks due soon message"
                fontSize="xs"
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
              >
                See all my tasks
              </Button>
            </AccordionButton>
            <AccordionPanel p={0}>
              <Box py={4}>
                <Stack spacing={2}>
                  {tasks?.map((t) => (
                    <ListItem task={t} key={t.id} />
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
