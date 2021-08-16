import React, { memo } from 'react'
import { Flex, Wrap, WrapItem } from 'src/components/atoms'
import { useTaskFilesContext } from 'src/components/organisms'
import { TasksFilesListItem } from '../TasksFilesListItem'

export const TasksFilesList: React.VFC = memo(() => {
  const { attachmentIds } = useTaskFilesContext()

  console.log('attachmentIds: ', attachmentIds)

  return (
    <Flex flex={1}>
      <Wrap spacing={10} justify="center">
        {attachmentIds.map((id) => (
          <WrapItem key={id}>
            <TasksFilesListItem attachmentId={id} />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
})
TasksFilesList.displayName = 'TasksFilesList'
