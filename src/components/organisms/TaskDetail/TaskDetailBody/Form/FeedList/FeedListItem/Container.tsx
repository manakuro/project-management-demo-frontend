import React, { memo, PropsWithChildren, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { useTaskFeedListItemContext } from './Provider'
import { useFeedListItemContainerContext } from './Provider/ProviderContainer'

type Props = PropsWithChildren<{}>

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { taskFeed, isPinned } = useTaskFeedListItemContext()
  const { containerRef, isReferenced } = useFeedListItemContainerContext()

  const style = useMemo((): FlexProps => {
    if (isReferenced)
      return {
        bg: 'yellow.100',
      }

    if (isPinned)
      return {
        bg: 'yellow.50',
      }

    return taskFeed.isPinned
      ? {
          borderLeft: 3,
          borderColor: 'yellow.300',
          borderLeftStyle: 'solid',
          bg: 'gray.50',
        }
      : {
          bg: 'gray.50',
        }
  }, [taskFeed.isPinned, isPinned, isReferenced])

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
