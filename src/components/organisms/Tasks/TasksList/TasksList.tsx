import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'

type Props = {
  children: (data: { onAddTask: () => void }) => React.ReactElement
}

export const TasksList: React.FC<Props> = memo<Props>((props) => {
  const handleAddTask = useCallback(() => {}, [])

  return <Flex flex={1}>{props.children({ onAddTask: handleAddTask })}</Flex>
})
