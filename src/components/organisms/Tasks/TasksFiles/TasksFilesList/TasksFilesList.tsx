import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTaskAttachmentsContext } from 'src/components/organisms'

export const TasksFilesList: React.VFC = memo(() => {
  const { attachmentIds } = useTaskAttachmentsContext()

  console.log('attachmentIds: ', attachmentIds)

  return (
    <Flex flex={1} position="relative" justifyContent="center">
      <div>hey</div>
      <div>hey</div>
      <div>hey</div>
    </Flex>
  )
})
TasksFilesList.displayName = 'TasksFilesList'
