import React from 'react'
import { Flex, Icon, IconBg, Option, Select, Text } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { formatDueTime } from 'src/shared/formatDate'
import { useClickableHover } from 'src/hooks'
import { times } from 'src/shared/time'

type Props = {
  onClick: () => void
  isEditing: boolean
  time?: string
}

const selects = times().map((t) => ({
  text: t,
  value: t,
}))

export const DueTime: React.FC<Props> = (props) => {
  const { clickableHoverStyle } = useClickableHover()
  if (!props.isEditing) {
    return (
      <Tooltip
        hasArrow
        color="white"
        bg="gray.800"
        label="Add due time"
        aria-label="A due time description"
        size="sm"
        fontSize="xs"
      >
        <IconBg onClick={props.onClick}>
          <Icon icon="time" color="text.muted" />
        </IconBg>
      </Tooltip>
    )
  }

  return (
    <Flex>
      <Flex alignItems="center" flex={1}>
        <Icon icon="time" color="text.muted" />
        <Text ml={2} fontSize="xs">
          Due time
        </Text>
        <Select
          value={props.time ? formatDueTime(props.time) : ''}
          onChange={(time: string) => console.log(time)}
          ml="auto"
          flex={1}
          size="sm"
          maxW={24}
        >
          {selects.map((s) => (
            <Option key={s.text} value={s.value} text={s.text} />
          ))}
        </Select>
        <Icon {...clickableHoverStyle} ml={1} icon="x" color="text.muted" />
      </Flex>
    </Flex>
  )
}