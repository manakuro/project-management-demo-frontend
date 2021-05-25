import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/Feeds/FeedListItem/Provider'

type Props = {}

export const Container: React.FC<Props> = memo((props) => {
  const { feed, isPinned } = useFeedListItem()

  const style = useMemo((): FlexProps => {
    if (isPinned)
      return {
        bg: 'yellow.50',
      }

    return feed.isPinned
      ? {
          borderLeft: 3,
          borderColor: 'yellow.300',
          borderLeftStyle: 'solid',
          bg: 'gray.50',
        }
      : {
          bg: 'gray.50',
        }
  }, [feed.isPinned, isPinned])

  return <Flex {...style} px={6} py={2} flexDirection="column" {...props} />
})
Container.displayName = 'Container'
