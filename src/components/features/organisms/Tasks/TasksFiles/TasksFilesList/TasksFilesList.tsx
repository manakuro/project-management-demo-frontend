import { memo, useMemo } from 'react'
import { useTasksTaskFiles } from 'src/components/features/organisms/Tasks/hooks'
import { Flex, Stack } from 'src/components/ui/atoms'
import { useBreakpointValue } from 'src/shared/chakra'
import { splitByNumber } from 'src/shared/utils'
import { TasksFilesListItem } from '../TasksFilesListItem'

export const TasksFilesList = memo(function TasksFilesList() {
  const { taskFileIds } = useTasksTaskFiles()
  const splitNum = useBreakpointValue({ base: 2, '2xl': 3 }) as number
  const sections = useMemo(
    () => splitByNumber(taskFileIds, splitNum),
    [taskFileIds, splitNum],
  )

  return (
    <Flex flex={1} pb={4}>
      <Stack maxW="90%" mx="auto" direction="row" spacing={8}>
        {sections.map((ids) => (
          <Stack spacing={8} key={ids.toString()}>
            {ids.map((id) => (
              <TasksFilesListItem taskFileId={id} key={id} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Flex>
  )
})
