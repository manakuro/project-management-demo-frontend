import React, { memo } from 'react'
import { Flex, Text, CheckIcon, DueDate, Stack } from 'src/components/atoms'
import { ProjectChip } from 'src/components/molecules'
import { PopoverDueDatePicker } from 'src/components/organisms/Popovers'
import { useClickableHoverStyle } from 'src/hooks'
import { formatDueTime } from 'src/shared/date'
import { useTask } from 'src/store/entities/tasks'
import { useTasksProjectTaskIds } from 'src/store/entities/tasks/projectIds'

type Props = {
  taskId: string
}

export const ListItem: React.VFC<Props> = memo((props) => {
  const { task } = useTask(props.taskId)
  const { clickableHoverStyle } = useClickableHoverStyle()
  const { projectIds } = useTasksProjectTaskIds(props.taskId)

  return (
    <Flex
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      px={4}
      py={2}
      h={10}
      {...clickableHoverStyle}
    >
      <Flex alignItems="center" flex={1}>
        <CheckIcon isDone={task.isDone} />
        <Text fontSize="sm" ml={2} isTruncated>
          {task.name}
        </Text>
      </Flex>
      <Flex
        w="200px"
        flex="0 0 auto"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Stack direction="row" spacing={2}>
          {projectIds.map((id) => (
            <ProjectChip projectId={id} key={id} />
          ))}
        </Stack>
        <PopoverDueDatePicker
          date={task.dueDate}
          time={task.dueTime}
          onChange={(date) => console.log(date)}
        >
          <DueDate
            ml={2}
            fontSize="xs"
            color="text.muted"
            textAlign="right"
            dueDate={task.dueDate}
          >
            {task.dueTime && (
              <Text as="span" fontSize="xs" color="text.muted" ml={1}>
                {formatDueTime(task.dueTime)}
              </Text>
            )}
          </DueDate>
        </PopoverDueDatePicker>
      </Flex>
    </Flex>
  )
})
ListItem.displayName = 'ListItem'
