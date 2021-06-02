import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { useFeedListItemContainer } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider/ProviderContainer'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const Container: React.FC<Props> = memo((props) => {
  const { feed, isPinned } = useFeedListItem()
  const { containerRef, isReferenced } = useFeedListItemContainer()

  const style = useMemo((): FlexProps => {
    if (isReferenced)
      return {
        bg: 'yellow.100',
      }

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
  }, [feed.isPinned, isPinned, isReferenced])

  return (
    <Flex
      {...style}
      ref={containerRef}
      px={6}
      py={2}
      flexDirection="column"
      transition={transitions.base()}
      {...props}
    />
  )
})
Container.displayName = 'Container'