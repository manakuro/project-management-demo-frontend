import React from 'react'
import { Badge, Flex, Icon, Text, IconProps } from 'src/components/atoms'
import { useClickableHover } from 'src/hooks'
import { TaskDueSoon } from './types'
import { useProject } from 'src/store/projects'
import { PopoverDueDatePicker } from 'src/components/organisms'
import { formatDueDate, formatDueTime } from 'src/shared/formatDate'

type Props = {
  task: TaskDueSoon
}

export const ListItem: React.VFC<Props> = (props) => {
  const { clickableHoverStyle, clickableHoverLightStyle } = useClickableHover()
  const { project } = useProject(props.task.projectId)
  const iconStyle: IconProps = props.task.isDone
    ? { icon: 'checkCircle', color: 'gray.500' }
    : { icon: 'checkCircleFilled', color: 'teal.400' }

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
        <Icon {...iconStyle} {...clickableHoverLightStyle} />
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
          <Text
            w={24}
            ml={2}
            fontSize="xs"
            color="text.muted"
            textAlign="right"
          >
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
