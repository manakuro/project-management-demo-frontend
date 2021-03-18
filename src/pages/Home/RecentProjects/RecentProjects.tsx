import React, { memo } from 'react'
import { Box, Heading, Icon, IconButton } from 'src/components/atoms'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from 'src/components/organisms'

type Props = {}

// const useTasksDueSoonQuery = () => {
//   const [tasks, setTasks] = useState<TaskDueSoon[]>()
//
//   useEffect(() => {
//     ;(async () => {
//       const res = await fetchTasksDueSoon()
//       setTasks(res)
//     })()
//   }, [])
//
//   return {
//     tasks,
//   }
// }

export const RecentProjects: React.VFC<Props> = memo<Props>(() => {
  // const { tasks } = useTasksDueSoonQuery()

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
              <Box py={4}>hey</Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
})
