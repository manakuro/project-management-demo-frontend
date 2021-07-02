import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useFeedListItemContext } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = FlexProps

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { editable } = useFeedListItemContext()

  return (
    <Flex
      border="1px"
      borderRadius="md"
      borderColor={editable() ? 'gray.400' : 'transparent'}
      p={2}
      flexDirection="column"
      flex={1}
      bg={editable() ? 'white' : 'transparent'}
      minH={editable() ? 40 : 0}
      position="relative"
      {...props}
    />
  )
})
Container.displayName = 'Container'
