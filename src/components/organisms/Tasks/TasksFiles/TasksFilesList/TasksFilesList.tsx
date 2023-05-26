import React, { memo, useMemo } from 'react'
import { useTasksTaskFiles } from 'src/components/organisms/Tasks/hooks'
import { Flex, Stack } from 'src/components/ui/atoms'
import { useBreakpointValue } from 'src/shared/chakra'
import { splitByNumber } from 'src/shared/utils'
import { TasksFilesListItem } from '../TasksFilesListItem'

export const TasksFilesList: React.FC = memo(() => {
  const { taskFileIds } = useTasksTaskFiles()
  const splitNum = useBreakpointValue({ base: 2, '2xl': 3 }) as number
  const sections = useMemo(
    () => splitByNumber(taskFileIds, splitNum),
    [taskFileIds, splitNum],
  )

  return (
    <Flex flex={1} pb={4}>
      <Stack maxW="90%" mx="auto" direction="row" spacing={8}>
        {sections.map((ids, i) => (
          <Stack spacing={8} key={i}>
            {ids.map((id) => (
              <TasksFilesListItem taskFileId={id} key={id} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Flex>
  )
})
TasksFilesList.displayName = 'TasksFilesList'
