import React from 'react'
import { Badge, Flex, Text, CheckIcon, DueDate } from 'src/components/atoms'
import { PopoverDueDatePicker } from 'src/components/organisms'
import { useClickableHoverStyle } from 'src/hooks'
import { formatDueTime } from 'src/shared/date'
import { useProject } from 'src/store/entities/projects'
import { TaskDueSoon } from './types'

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
          <DueDate
            ml={2}
            fontSize="xs"
            color="text.muted"
            textAlign="right"
            dueDate={props.task.dueDate}
          >
            {props.task.dueTime && (
              <Text as="span" fontSize="xs" color="text.muted" ml={1}>
                {formatDueTime(props.task.dueTime)}
              </Text>
            )}
          </DueDate>
        </PopoverDueDatePicker>
      </Flex>
    </Flex>
  )
}
