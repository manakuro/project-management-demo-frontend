import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'

export const TasksFilesList: React.VFC = memo(() => {
  return (
    <Flex flex={1} position="relative" justifyContent="center">
      <div>hey</div>
      <div>hey</div>
      <div>hey</div>
    </Flex>
  )
})
TasksFilesList.displayName = 'TasksFilesList'
