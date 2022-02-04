import React, { memo } from 'react'
import { Flex, Icon, Text, TextProps } from 'src/components/atoms'
import { TaskFeed } from 'src/store/entities/taskFeed'
import { Teammate } from 'src/store/entities/teammates'
import { useTaskFeedListItemContext } from '../Provider'

type Props = TextProps

const generateTitle = (
  {
    teammate,
    taskFeed,
  }: {
    teammate: Teammate
    taskFeed: TaskFeed
  },
  { hasTaskFile }: { hasTaskFile: boolean },
): React.ReactElement => {
  switch (true) {
    case taskFeed.isFirst:
      return <Text>{`${teammate.name} created this task.`}</Text>
    case Boolean(hasTaskFile): {
      return (
        <Flex flex={1} alignItems="center">
          <Icon icon="attach" color="text.muted" />
          <Text ml={1}>attached</Text>
        </Flex>
      )
    }
    default:
      return <Text>{teammate.name}</Text>
  }
}

export const Title: React.VFC<Props> = memo<Props>((props) => {
  const { teammate, taskFeed, hasTaskFile } = useTaskFeedListItemContext()
  const title = generateTitle({ teammate, taskFeed }, { hasTaskFile })

  return (
    <Flex fontSize="sm" fontWeight="medium" ml={2} {...props}>
      {title}
    </Flex>
  )
})
Title.displayName = 'Title'
