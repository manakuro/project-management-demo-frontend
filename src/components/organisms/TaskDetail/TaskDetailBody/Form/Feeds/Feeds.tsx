import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useAttachmentsByTask } from 'src/store/attachments'
import { Feed } from './Feed'

type Props = {
  taskId: string
}

export const Feeds: React.VFC<Props> = memo<Props>((props) => {
  const { attachmentIds } = useAttachmentsByTask(props.taskId)

  return (
    <Flex mt={4} bg="gray.50">
      {attachmentIds.map((id) => (
        <Feed key={id} feedId={id} />
      ))}
    </Flex>
  )
})
