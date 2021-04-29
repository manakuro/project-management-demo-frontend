import React from 'react'
import { Badge, Flex, Text, CheckIcon } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { TaskDueSoon } from './types'
import { useProject } from 'src/store/projects'
import { PopoverDueDatePicker } from 'src/components/organisms'
import { formatDueDate, formatDueTime } from 'src/shared/date'

type Props = {
  task: TaskDueSoon
}

export const ListItem: React.VFC<Props> = (props) => {
  const { clickableHoverStyle } = useClickableHoverStyle()
  const { project } = useProject(props.task.projectId)

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
        <CheckIcon isDone={props.task.isDone} />
        <Text fontSize="sm" ml={2} isTruncated>
          {props.task.name}
        </Text>
      </Flex>
      <Flex
        w="200px"
        flex="0 0 auto"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Badge variant="solid" bg={project.color.color} textAlign="center">
          {project.name}
        </Badge>
        <PopoverDueDatePicker
          date={props.task.dueDate}
          time={props.task.dueTime}
          onChange={(date) => console.log(date)}
        >
          <Text ml={2} fontSize="xs" color="text.muted" textAlign="right">
            {formatDueDate(props.task.dueDate)}
            {props.task.dueTime && (
              <Text as="span" fontSize="xs" color="text.muted" ml={1}>
                {formatDueTime(props.task.dueTime)}
              </Text>
            )}
          </Text>
        </PopoverDueDatePicker>
      </Flex>
    </Flex>
  )
}
